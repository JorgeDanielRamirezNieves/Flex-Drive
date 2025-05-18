import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {}
