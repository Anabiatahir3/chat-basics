import { WebSocketGateway, SubscribeMessage, MessageBody,WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server,Socket } from 'socket.io';

@WebSocketGateway({
  cors:[{
    origin:["http:localhost:3001"]
  }]
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}
  @WebSocketServer()
  server:Server;
onModuleInit() {
    this.server.on("connection",socket=>{
        console.log(socket.id)
        socket.emit('message',"welcome")
        socket.broadcast.emit('message', 'A user has joined')
        socket.on('disconnect',()=>{
          this.server.emit("message","A user has left the chat")

        })
        
    })
    
}

  @SubscribeMessage('createMessage')
  async addMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message=await this.messagesService.addMessage(createMessageDto);
    this.server.emit('message', message)
    console.log(message)
    return message;
  }

//   @SubscribeMessage('newJoin')
//   newUser(client:Socket,data:any){
// this.server.emit("message",data.msg)
//   }

  @SubscribeMessage('findAllMessages')
  async findAll(client:Socket, data:any) {
    const messages=await this.messagesService.findAll(data.room);
    //console.log(messages)
    return messages
   
  }

}
