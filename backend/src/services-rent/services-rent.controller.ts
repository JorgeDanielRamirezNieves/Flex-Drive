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
import { ServicesRentService } from './services-rent.service';
import { ServiceRent } from './models/serviceRent';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('services-rent')
@Controller('services-rent')
export class ServicesRentController {
  constructor(private readonly ServiceRentService: ServicesRentService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllServiceRents(): any {
    return this.ServiceRentService.listServiceRents();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the service',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneServiceRent(@Param('uuid') uuid: any): any {
    const uuidServiceRent = uuid;
    if (uuidServiceRent && uuidServiceRent.length > 0) {
      return this.ServiceRentService.getServiceRentsByUUID(uuidServiceRent);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
  @Get('findByClient/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the client',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findByClientServiceRent(@Param('uuid') uuid: any): any {
    const uuidClient = uuid;
    if (uuidClient && uuidClient.length > 0) {
      return this.ServiceRentService.getServiceRentsByUUIIDClient(uuidClient);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object service',
    type: ServiceRent,
  })
  @UseGuards(AuthGuard)
  private addServiceRent(@Req() request: any): any {
    const objServiceRent: ServiceRent = request.body;
    if (objServiceRent) {
      return this.ServiceRentService.createServiceRent(objServiceRent);
    } else {
      return new HttpException(
        'Object of ServiceRent invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('changeStatus')
  @ApiBody({
    description: 'Object ServiceRent',
    type: Object,
  })
  @UseGuards(AuthGuard)
  private changeStatusServiceRent(@Req() obj: any): any {
    if (obj.body) {
      return this.ServiceRentService.changeSatusServiceRent(obj.body);
    } else {
      return new HttpException(
        'Object of ServiceRent invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the ServiceRent',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteServiceRent(@Param('uuid') uuid: any): any {
    const uuidServiceRent = uuid;
    if (uuidServiceRent && uuidServiceRent.length > 0) {
      return this.ServiceRentService.deleteServiceRent(uuidServiceRent);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
