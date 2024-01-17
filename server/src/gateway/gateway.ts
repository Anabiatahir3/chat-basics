import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { OnModuleInit } from "@nestjs/common/interfaces";
import { Server } from "socket.io";

@WebSocketGateway({
    cors:{
        origin:["http://localhost:3001"]
    }
})
export class Gateway implements OnModuleInit{

@WebSocketServer()
server:Server;
onModuleInit() {
    this.server.on("connection",(socket)=>{
        console.log(socket.id)
        console.log('connected')
    })
    
}

    @SubscribeMessage('send_message')
    //send message is the event that is fired from the client to the server
    //another client that has subscribed to the onMessage event receives the message that was fired when sendMessage event was fired
    onNewMessage(@MessageBody() body:string){
        console.log(body)
        this.server.emit('onMessage',{
            msg:"New message",
            content:body
        })
    }
}