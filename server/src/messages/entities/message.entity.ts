import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';



@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    text:string;

    @Column()
    room:string

    @Column()
    createdAt:Date
}
