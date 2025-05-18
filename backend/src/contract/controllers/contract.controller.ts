import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('contract')
@Controller('contract')
export class ContractController {}
