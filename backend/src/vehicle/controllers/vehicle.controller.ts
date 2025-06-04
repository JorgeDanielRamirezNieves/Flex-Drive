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
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../models/vehicle';
import { Parameters } from 'src/user/models/preferences';


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
      return new HttpException(
        'the limit must be at least 1',
        HttpStatus.NOT_ACCEPTABLE,
      );
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
      return new HttpException(
        'the limit must be at least 1',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  
  @Post('findPreferedByUser')
  @ApiBody({
    description: 'object parameters',
    type: Object,
  })
  private findPreferedByUser(@Req() request: any): any {
    const objParameters: Parameters = request.body;
    if (objParameters ) {
      return this.VehicleService.getVehiclesPreferedByUser(objParameters);
    } else {
      return new HttpException(
        'Object of parameters invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  @Post('search')
  @ApiBody({
    description: 'object parameters',
    type: Object,
  })
  private searchVehicles(@Req() request: any): any {
    const objParameters = request.body;
    if (objParameters ) {
      return this.VehicleService.searchVehicles(objParameters.parameters, objParameters.tags);
    } else {
      return new HttpException(
        'Object of parameters invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('findBrands/:limit')
  @ApiParam({
    name: 'limit',
    description: 'Limit of Brands to return',
    required: true,
    type: Number,
  })
  private findBrands(@Param('limit') limit: any): any {
    const limitVehicle = limit;
    if (limitVehicle && limitVehicle > 0) {
      return this.VehicleService.getBrands(limitVehicle);
    } else {
      return new HttpException(
        'the limit must be at least 1',
        HttpStatus.NOT_ACCEPTABLE,
      );
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

  @Put('update')
  @ApiBody({
    description: 'Object Vehicle',
    type: Vehicle,
  })
  private updateVehicle(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidVehicle = uuid;
    const objVehicle: Vehicle = request.body;
    if (objVehicle) {
      return this.VehicleService.updateVehicle(objVehicle);
    } else {
      return new HttpException(
        'Object of Vehicle invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('changeStatus')
  @ApiBody({
    description: 'Object User with uuid and new role',
    type: Object,
  })
  private changeStatus(@Req() request: any): any {
    const objStatus = request.body;
    if (objStatus && objStatus.uuid && objStatus.status) {
      return this.VehicleService.changeStatusVehicle(objStatus);
    } else {
      return new HttpException(
        'uuid or new role of Vehicle invalid',
        HttpStatus.BAD_REQUEST,
      );
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
