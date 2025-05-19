import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../models/vehicle';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
    constructor(private readonly VehicleService: VehicleService) {}
    
      @Get('findAll')
      private findAllVehicles(): any {
        return this.VehicleService.listVehicles();
      }
    
      @Get('findOne/:uuid')
      @ApiParam({
        name: 'uuid',
        description: 'UUID of the Vehicle',
        required: true,
        type: String,
      })
      private findOneVehicle(@Param('uuid') uuid: any): any {
        const uuidVehicle = uuid;
        if (uuidVehicle && uuidVehicle.length > 0) {
          return this.VehicleService.getVehiclesByUUID(uuidVehicle);
        } else {
          return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
    
      @Post('add')
      @ApiBody({
        description: 'Object Vehicle',
        type: Vehicle,
      })
      private addVehicle(@Req() request: any): any {
        const objVehicle: Vehicle = request.body;
        if (objVehicle) {
          return this.VehicleService.createVehicle(objVehicle);
        } else {
          return new HttpException(
            'Object of Vehicle invalid',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    
      @Put('update/:uuid')
      @ApiParam({
        name: 'uuid',
        description: 'UUID of the Vehicle',
        required: true,
        type: String,
      })
      @ApiBody({
        description: 'Object Vehicle',
        type: Vehicle,
      })
      private updateVehicle(@Param('uuid') uuid: any, @Req() request: any): any {
        const uuidVehicle = uuid;
        const objVehicle: Vehicle = request.body;
        if (uuidVehicle && uuidVehicle.length > 0) {
          if (objVehicle) {
            return this.VehicleService.updateVehicle(uuidVehicle, objVehicle);
          } else {
            return new HttpException(
              'Object of Vehicle invalid',
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
        description: 'UUID of the Vehicle',
        required: true,
        type: String,
      })
      private deleteVehicle(@Param('uuid') uuid: any): any {
        const uuidVehicle = uuid;
        if (uuidVehicle && uuidVehicle.length > 0) {
          return this.VehicleService.deleteVehicle(uuidVehicle);
        } else {
          return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
      }
}
