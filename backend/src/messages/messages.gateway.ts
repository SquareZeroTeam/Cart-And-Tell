import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from 'src/authentication/jwt/jwt.service';
import { ForbiddenException } from '@nestjs/common';

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

export class MessagesGateway implements OnGatewayConnection,OnGatewayDisconnect{ 
  @WebSocketServer() server: Server;
  constructor(private readonly messagesService: MessagesService, private readonly jwt:JwtService) {}
  handleConnection() {
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
    @MessageBody() data: { userId: number; roomId: string },
    @ConnectedSocket() client:Socket ) {
      await client.join(data.roomId);
      return await this.messagesService.joinRoom(data.roomId,data.userId);
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    const clientRooms = Array.from(client.rooms.values());
    console.log(`Client ${client.id} disconnected from rooms: ${clientRooms}`);
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
