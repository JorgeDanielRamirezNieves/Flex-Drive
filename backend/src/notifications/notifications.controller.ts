import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notification')
@Controller('notifications')
export class NotificationsController {}
