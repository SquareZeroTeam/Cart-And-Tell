import { IsInt, Length } from "class-validator";

export class CreateMessageDto {
    @Length(1,256) 
    text:string
    
    @IsInt()
    userId:number
    
    liveStreamRoomId:string
}
