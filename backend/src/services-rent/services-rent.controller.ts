import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ServicesRentService } from './services-rent.service';
import { ServiceRent } from './models/serviceRent';

@ApiTags('services-rent')
@Controller('services-rent')
export class ServicesRentController {
    constructor(private readonly ServiceRentService: ServicesRentService) {}
    
      @Get('findAll')
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
      private findOneServiceRent(@Param('uuid') uuid: any): any {
        const uuidServiceRent = uuid;
        if (uuidServiceRent && uuidServiceRent.length > 0) {
          return this.ServiceRentService.getServiceRentsByUUID(uuidServiceRent);
        } else {
          return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
    
      @Post('add')
      @ApiBody({
        description: 'Object service',
        type: ServiceRent,
      })
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
    
      @Put('update/:uuid')
      @ApiParam({
        name: 'uuid',
        description: 'UUID of the ServiceRent',
        required: true,
        type: String,
      })
      @ApiBody({
        description: 'Object ServiceRent',
        type: ServiceRent,
      })
      private updateServiceRent(@Param('uuid') uuid: any, @Req() request: any): any {
        const uuidServiceRent = uuid;
        const objServiceRent: ServiceRent = request.body;
        if (uuidServiceRent && uuidServiceRent.length > 0) {
          if (objServiceRent) {
            return this.ServiceRentService.updateServiceRent(uuidServiceRent, objServiceRent);
          } else {
            return new HttpException(
              'Object of ServiceRent invalid',
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
        description: 'UUID of the ServiceRent',
        required: true,
        type: String,
      })
      private deleteServiceRent(@Param('uuid') uuid: any): any {
        const uuidServiceRent = uuid;
        if (uuidServiceRent && uuidServiceRent.length > 0) {
          return this.ServiceRentService.deleteServiceRent(uuidServiceRent);
        } else {
          return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
}
