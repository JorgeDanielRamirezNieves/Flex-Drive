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
} from '@nestjs/common';
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
  
  @Get('findbyPLate/:plate')
  @ApiParam({
    name: 'plate',
    description: 'plate of the Vehicle',
    required: true,
    type: String,
  })
  private findByPLateVehicle(@Param('plate') plate: any): any {
    const plateVehicle = plate;
    if (plateVehicle && plateVehicle.length > 0) {
      return this.VehicleService.getVehiclesByPlate(plateVehicle);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
  
  @Get('findByUser/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Owner',
    required: true,
    type: String,
  })
  private findOneByOwner(@Param('uuid') uuid: any): any {
    const uuidVehicle = uuid;
    if (uuidVehicle && uuidVehicle.length > 0) {
      return this.VehicleService.getVehiclesByUser(uuidVehicle);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
  
  @Get('findWithLimit/:limit')
  @ApiParam({
    name: 'limit',
    description: 'Limit of Vehicles to return',
    required: true,
    type: Number,
  })
  private findVehicleLimit(@Param('limit') limit: any): any {
    const limitVehicle = limit;
    if (limitVehicle && limitVehicle > 0) {
      return this.VehicleService.getVehiclesLimit(limitVehicle);
    } else {
      return new HttpException('the limit must be at least 1', HttpStatus.NOT_ACCEPTABLE);
    }
  }
  
  @Get('findMostRequested/:limit')
  @ApiParam({
    name: 'limit',
    description: 'Limit of Vehicles to return',
    required: true,
    type: Number,
  })
  private findVehicleMostRequested(@Param('limit') limit: any): any {
    const limitVehicle = limit;
    if (limitVehicle && limitVehicle > 0) {
      return this.VehicleService.getVehiclesMostRequest(limitVehicle);
    } else {
      return new HttpException('the limit must be at least 1', HttpStatus.NOT_ACCEPTABLE);
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
