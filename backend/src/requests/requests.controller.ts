import { Controller, Get, Param, HttpException, HttpStatus, Post, Req, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { Request } from './models/request';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
    constructor(private readonly RequestService: RequestsService) { }

    @Get('findAll')
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
    private updateRequest(@Param('uuid') uuid: any, @Req() request: any): any {
        const uuidRequest = uuid;
        const objRequest: Request = request.body;
        if (uuidRequest && uuidRequest.length > 0) {
            if (objRequest) {
                return this.RequestService.updateRequest(uuidRequest, objRequest);
            } else {
                return new HttpException(
                    'name of Request invalid',
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
        description: 'UUID of the Request',
        required: true,
        type: String,
    })
    private deleteRequest(@Param('uuid') uuid: any): any {
        const uuidRequest = uuid;
        if (uuidRequest && uuidRequest.length > 0) {
            return this.RequestService.deleteRequest(uuidRequest);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}

