import { Injectable,NotFoundException} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import {Repository} from 'typeorm';
import { Message } from './entities/message.entity';
import {InjectRepository} from "@nestjs/typeorm"
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository:Repository<Message>,

    ){}
    clientToUser={}
  
  addMessage(createMessageDto: CreateMessageDto) {
    const msg=this.messageRepository.create(createMessageDto)
    return this.messageRepository.save(msg)
  }

  findAll() {
    return this.messageRepository.find()
  }
identify(name:string,id:string){
  this.clientToUser[id]=name;
  return Object.values(this.clientToUser)
}
getClientName(id:string){
  return this.clientToUser[id]
}

 
}
