// import { IsString,IsNotEmpty } from "class-validator";

import { Message } from "../entities/message.entity";

// export class CreateMessageDto {

// @IsString()
// name:string;

// @IsString()
// @IsNotEmpty()
// text:string;
// }

export class CreateMessageDto extends Message{
    
}