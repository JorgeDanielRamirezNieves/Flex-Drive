import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Message } from '../models/message';

@Controller('message')
@ApiTags('message')
export class MessageController {
  constructor(private readonly MessagesService: MessageService) {}

  @Get('findAll')
  private findAllMessages(): any {
    return this.MessagesService.listMessages();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the message',
    required: true,
    type: String,
  })
  private findOneMessage(@Param('uuid') uuid: any): any {
    const uuidMessages = uuid;
    if (uuidMessages) {
      return this.MessagesService.getMessagesByUUID(uuidMessages);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object message',
    type: Message,
  })
  private addMessage(@Req() request: any): any {
    const objMessages: Message = request.body;
    if (objMessages) {
      return this.MessagesService.createMessage(objMessages);
    } else {
      return new HttpException(
        'Name of Messages invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('changeStatus')
  @ApiBody({
    description: 'Object with uuid and status',
    type: Object,
  })
  private changeStatus(@Req() request: any): any {
    const objMessages = request.body;
    if (objMessages) {
      return this.MessagesService.changeStatusMessage(objMessages);
    } else {
      return new HttpException(
        "Message's name invalid",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Patch('changeDescription')
  @ApiBody({
    description: 'Object with uuid and description',
    type: Object,
  })
  private changeDescription(@Req() request: any): any {
    const objMessages = request.body;
    if (objMessages) {
      return this.MessagesService.changeDescriptionMessage(objMessages);
    } else {
      return new HttpException(
        "Message's name invalid",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the message',
    required: true,
    type: String,
  })
  private deleteMessage(@Param('uuid') uuid: any): any {
    const uuidMessages = uuid;
    if (uuidMessages && uuidMessages.length > 0) {
      return this.MessagesService.deleteMessage(uuidMessages);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
