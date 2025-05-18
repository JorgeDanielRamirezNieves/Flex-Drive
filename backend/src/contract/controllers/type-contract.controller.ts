import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { TypeContractService } from '../service/type-contract.service';
import { TypeContract } from '../models/type-contract';

@Controller('type-contract')
@ApiTags('type-contract')
export class TypeContractController {
    constructor(private readonly TypeContractService: TypeContractService) {}
        
          @Get('findAll')
          private findAllTypeContracts(): any {
            return this.TypeContractService.listTypeContracts();
          }
        
          @Get('findOne/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type contract',
            required: true,
            type: String,
          })
          private findOneTypeContract(@Param('uuid') uuid: any): any {
            const uuidTypeContract = uuid;
            if (uuidTypeContract && uuidTypeContract.length > 0) {
              return this.TypeContractService.getTypeContractsByUUID(uuidTypeContract);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
        
          @Post('add')
          @ApiBody({
            description: 'Object type contract',
            type: TypeContract,
          })
          private addTypeContract(@Req() request: any): any {
            const objTypeContract: TypeContract = request.body;
            if (objTypeContract && objTypeContract.name && objTypeContract.name.length > 0) {
              return this.TypeContractService.createTypeContract(objTypeContract);
            } else {
              return new HttpException(
                'name of type contract invalid',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        
          @Put('update/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type contract',
            required: true,
            type: String,
          })
          @ApiBody({
            description: 'Object type contract',
            type: TypeContract,
          })
          private updateTypeContract(@Param('uuid') uuid: any, @Req() request: any): any {
            const uuidTypeContract = uuid;
            const objTypeContract: TypeContract = request.body;
            if (uuidTypeContract && uuidTypeContract.length > 0) {
              if (objTypeContract && objTypeContract.name && objTypeContract.name.length > 0) {
                return this.TypeContractService.updateTypeContract(uuidTypeContract, objTypeContract);
              } else {
                return new HttpException(
                  'name of type contract invalid',
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
            description: 'UUID of the type contract',
            required: true,
            type: String,
          })
          private deleteTypeContract(@Param('uuid') uuid: any): any {
            const uuidTypeContract = uuid;
            if (uuidTypeContract && uuidTypeContract.length > 0) {
              return this.TypeContractService.deleteTypeContract(uuidTypeContract);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
}
