import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
