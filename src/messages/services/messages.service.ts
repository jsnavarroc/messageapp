import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message-dto';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) { }

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async createMessage(menssageNew: CreateMessageDto): Promise<Message> { 
        const newMessage = new Message();
        newMessage.message = menssageNew.message;
        newMessage.nick = menssageNew.nick;

        return this.messageRepository.save(newMessage);
    }

    async updateMessage(idMessage: number, updateMessage: CreateMessageDto): Promise<Message> { 
        const messageUpdate = await this.messageRepository.findOne(idMessage);
        messageUpdate.nick = updateMessage.nick;
        messageUpdate.message = updateMessage.message;
        return this.messageRepository.save(messageUpdate);
    }

    async deleteMessage(idMessage: number): Promise<any> { 
      return await this.messageRepository.delete(idMessage);
    }
}
