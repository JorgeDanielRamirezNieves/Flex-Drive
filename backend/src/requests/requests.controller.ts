import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {}
