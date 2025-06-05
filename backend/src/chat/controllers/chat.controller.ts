import {
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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from '../service/chat.service';
import { Chat } from '../models/chat';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllChats(): any {
    return this.ChatService.listChats();
  }

  @Get('findOne/:uuid')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Chat',
    required: true,
    type: String,
  })
  private findOneChat(@Param('uuid') uuid: any): any {
    const uuidChat = uuid;
    if (uuidChat && uuidChat.length > 0) {
      return this.ChatService.getChatsByUUID(uuidChat);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('findByUserUUID/:uuidUser')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'uuidUser',
    description: 'UUID of the User',
    required: true,
    type: String,
  })
  private findByUserUUID(@Param('uuidUser') UserUUID: any): any {
    const uuidUser = UserUUID;
    console.log('uuidUser', uuidUser);

    if (uuidUser && uuidUser.length > 0) {
      return this.ChatService.getChatsByuserUUID(uuidUser);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Object Chat',
    type: Chat,
  })
  private addChat(@Req() request: any): any {
    const objChat: Chat = request.body;
    if (objChat) {
      return this.ChatService.createChat(objChat);
    } else {
      return new HttpException(
        'Object of Chat invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('changeStatus')
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Object for change status of Chat',
    type: Object,
  })
  private changeStatusChat(@Req() request: any): any {
    const obj = request.body;
    if (obj) {
      return this.ChatService.changeStatusChat(obj);
    } else {
      return new HttpException(
        'Object of Chat invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:uuid')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Chat',
    required: true,
    type: String,
  })
  private deleteChat(@Param('uuid') uuid: any): any {
    const uuidChat = uuid;
    if (uuidChat && uuidChat.length > 0) {
      return this.ChatService.deleteChat(uuidChat);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
