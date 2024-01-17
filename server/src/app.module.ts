import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Message } from './messages/entities/message.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:"db.sqlite",
    synchronize:true,
    entities:[Message]
  }),MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
