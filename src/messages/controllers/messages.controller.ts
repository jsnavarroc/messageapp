import { Body, Controller, Post, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';

import { CreateMessageDto } from '../dto/create-message-dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private messageService:MessagesService) { 

    } 

    @Post()
    create(@Body() createMessageDto: CreateMessageDto, @Res() response) { 
        this.messageService.createMessage(createMessageDto).then((message) => { 
            response.status(HttpStatus.CREATED).json(message);
        }).catch((error) => { 
            response.status(HttpStatus.FORBIDDEN).json({messages: 'error when to tried created message'});
        });
    }

    @Get()
    getAll(@Res() response) { 
        this.messageService.getAll().then((messageList) => { 
            response.status(HttpStatus.CREATED).json(messageList);
        }).catch(() => { 
            response.status(HttpStatus.FORBIDDEN).json({messages: 'error when to tried get list message'});
        })
    }
    @Put(':id')
    update(@Body() updateMessagesDto: CreateMessageDto, @Res() response, @Param('id') idMessage) { 
        this.messageService.updateMessage(idMessage, updateMessagesDto).then((message) => { 
            response.status(HttpStatus.OK).json(message);
        }).catch((error) => { 
            response.status(HttpStatus.FORBIDDEN).json({messages: 'error when to tried edit message'});
        });
    }
    @Delete(':id')
    delete( @Res() response, @Param('id') idMessage) { 
        this.messageService.deleteMessage(idMessage).then((message) => { 
            response.status(HttpStatus.OK).json(message);
        }).catch(() => { 
            response.status(HttpStatus.FORBIDDEN).json({messages: 'error when to tried delet message'});
        })
    }
}
