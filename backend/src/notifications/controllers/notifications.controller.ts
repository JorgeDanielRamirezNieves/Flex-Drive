import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from '../service/notifications.service';
import { Notification } from '../models/notification';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('notification')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly NotificationService: NotificationsService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllNotifications(): any {
    return this.NotificationService.listNotifications();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Notification',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneNotification(@Param('uuid') uuid: any): any {
    const uuidNotification = uuid;
    if (uuidNotification && uuidNotification.length > 0) {
      return this.NotificationService.getNotificationsByUUID(uuidNotification);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('findByUser/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the User',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private async findNotificationsByUser(@Param('uuid') uuid: any) {
    const uuidUser = uuid;
    if (uuidUser && uuidUser.length > 0) {
      const notifications =
        await this.NotificationService.getNotificationsOfUser(uuidUser);
      return (
        notifications?.filter(
          (notification) =>
            notification.typeNotification?.name !== 'email' &&
            notification.typeNotification?.name !== 'sms',
        ) || []
      );
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object Notification',
    type: Notification,
  })
  @UseGuards(AuthGuard)
  private addNotification(@Req() request: any): any {
    const objNotification: Notification = request.body;
    if (objNotification) {
      return this.NotificationService.createNotification(objNotification);
    } else {
      return new HttpException(
        'Object of Notification invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Notification',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Notification',
    type: Notification,
  })
  @UseGuards(AuthGuard)
  private updateNotification(
    @Param('uuid') uuid: any,
    @Req() request: any,
  ): any {
    const uuidNotification = uuid;
    const objNotification: Notification = request.body;
    if (uuidNotification && uuidNotification.length > 0) {
      if (objNotification) {
        return this.NotificationService.updateNotification(
          uuidNotification,
          objNotification,
        );
      } else {
        return new HttpException(
          'Object of Notification invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Notification',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteNotification(@Param('uuid') uuid: any): any {
    const uuidNotification = uuid;
    if (uuidNotification && uuidNotification.length > 0) {
      return this.NotificationService.deleteNotification(uuidNotification);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
