import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

interface userObj {
  id:number;
  email:string;
  cart:Array<any>;
  cartCount:number;
  isMerchant:boolean;
  merchant: {id:number,userId:number}
}

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  namespace:'messages'
})

export class MessagesGateway implements OnGatewayConnection{ 
  @WebSocketServer() server: Server;
  constructor(private readonly messagesService: MessagesService, private readonly jwt:JwtService,private readonly prisma:PrismaService) {}
  async handleConnection(client: Socket, ...args: any[]) {
    client.on('disconnecting',async () => {
      console.log(`${client.id} disconnected from room ${Array.from(client.rooms.values())}`)
      await this.prisma.clientConnected.deleteMany({where:{socketId:client.id}});
    })
    console.log('User is connected');
  }
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client:Socket) {
    let userObj:userObj = null ;
    try {
      userObj = this.jwt.decode(client.request.headers.authorization.split(' ')[1]) as userObj;
    } catch (error) {
      throw new ForbiddenException('You are not authorized to access this resource');
    }
    if (userObj.id !== createMessageDto.userId) {
      throw new ForbiddenException('You are not authorized to access this resource');
    }
    const message = await this.messagesService.create(createMessageDto);
    this.server.to(createMessageDto.liveStreamRoomId).emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@MessageBody("roomId") roomId:string) {
    return await this.messagesService.findAll(roomId);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody() data: { userId: number; roomId: string},
    @ConnectedSocket() client:Socket ) {
      client.join(data.roomId);
      return await this.messagesService.joinRoom(data.roomId,data.userId);
  }

  @SubscribeMessage('joinLivestream')
  async userConnected(
    @MessageBody() data: { clientId; roomId: string},
    @ConnectedSocket() client:Socket
  ) {
    console.log('user connected to livestream')
    client.broadcast.to(data.roomId).emit('connectlivestream',data);
    const liveStream = await this.prisma.liveStream.findUnique({where:{roomId:data.roomId}});
    await this.prisma.clientConnected.create({data:{liveStreamId:liveStream.roomId,socketId:client.id,peerId:data.clientId}})
  }
  @SubscribeMessage('liveStreamViewers')
  async liveStreamViewers(
    @MessageBody() data: { roomId: string},
    @ConnectedSocket() client:Socket
  ) {
    const liveStream = await this.prisma.liveStream.findUnique({where:{roomId:data.roomId}});
    const viewers = await this.prisma.clientConnected.findMany({where:{liveStreamId:liveStream.roomId}});
    console.log(viewers)
    return viewers;
  }
  @SubscribeMessage('endLivestream')
  async endLivestream(
    @MessageBody('roomId') roomId:string,
    @ConnectedSocket() client:Socket
  ) {
    let userObj:userObj = null ;
    const livestream = await this.prisma.liveStream.findUnique({where:{roomId}});
    console.log(livestream);
    try {
      userObj = this.jwt.decode(client.request.headers.authorization.split(' ')[1]) as userObj;
      console.log(userObj);
    } catch (error) {
      throw new ForbiddenException('You are not authorized to access this resource');
    }
    if (userObj.merchant.id != livestream.merchantId) {
      throw new ForbiddenException('You are not authorized to access this resource');
    } 
    this.server.to(roomId).emit('endLivestreamDisconnect');
    await this.prisma.message.deleteMany({where:{liveStreamRoomId:roomId}});
    await this.prisma.liveStream.delete({where:{roomId}});
  }
  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }
}
