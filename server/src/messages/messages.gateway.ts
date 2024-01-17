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
    this.server.on("connection",(socket)=>{
        console.log(socket.id)
        console.log('connected')
        return socket.id
    })
    
}

  @SubscribeMessage('createMessage')
  async addMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message=await this.messagesService.addMessage(createMessageDto);
    this.server.emit('message', message)
    console.log(message)
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    const messages=await this.messagesService.findAll();
    console.log(messages)
    return messages
   
  }

@SubscribeMessage('join')
identify(@MessageBody('name')name:string, @ConnectedSocket() client:Socket){
  return this.messagesService.identify(name,client.id)
}
}
