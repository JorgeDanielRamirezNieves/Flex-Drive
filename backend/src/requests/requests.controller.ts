import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Put,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { Request } from './models/request';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly RequestService: RequestsService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllRequests(): any {
    return this.RequestService.listRequests();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Request',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneRequest(@Param('uuid') uuid: any): any {
    const uuidRequest = uuid;
    if (uuidRequest && uuidRequest.length > 0) {
      return this.RequestService.getRequestByUUID(uuidRequest);
    } else {
      return new HttpException('UUID invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('findbyUser/:uuidClient')
  @ApiParam({
    name: 'uuidClient',
    description: 'UUID of the Client',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneRequestByClient(@Param('uuidClient') uuid: any): any {
    const uuidRequest = uuid;
    if (uuidRequest && uuidRequest.length > 0) {
      return this.RequestService.getRequestByClientUUID(uuidRequest);
    } else {
      return new HttpException('UUID invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('findbyOwner/:uuidOwner')
  @ApiParam({
    name: 'uuidOwner',
    description: 'UUID of the Owner',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneRequestByOwner(@Param('uuidOwner') uuid: any): any {
    const uuidRequest = uuid;
    if (uuidRequest && uuidRequest.length > 0) {
      return this.RequestService.getRequestByOwnerUUID(uuidRequest);
    } else {
      return new HttpException('UUID invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object Request',
    type: Request,
  })
  @UseGuards(AuthGuard)
  private addRequest(@Req() request: any): any {
    const objRequest: Request = request.body;
    if (objRequest) {
      return this.RequestService.createRequest(objRequest);
    } else {
      return new HttpException(
        'name of Request invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Request',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Request',
    type: Request,
  })
  @UseGuards(AuthGuard)
  private updateRequest(
    @Param('uuid') uuid: any,
    @Req() request: any,
  ): any {
    const uuidRequest = uuid;
    const objRequest: Request = request.body;
    if (uuidRequest && uuidRequest.length > 0 && objRequest) {
      return this.RequestService.updateRequest(uuidRequest, objRequest);
    } else {
      return new HttpException(
        'name of Request or UUID invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('changeStatus')
  @ApiBody({
    description: 'Object Request',
    type: Object,
  })
  @UseGuards(AuthGuard)
  private changeRequestStatus(@Req() request: any): any {
    const obj = request.body;
    if (obj) {
      return this.RequestService.changeStatusRequest(obj);
    } else {
      return new HttpException(
        'name of Request invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Request',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteRequest(@Param('uuid') uuid: any): any {
    const uuidRequest = uuid;
    if (uuidRequest && uuidRequest.length > 0) {
      return this.RequestService.deleteRequest(uuidRequest);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
