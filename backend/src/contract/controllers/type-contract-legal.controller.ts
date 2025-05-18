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
import { TypeContractLegalService } from '../service/type-contract-legal.service';
import { TypeContractLegal } from '../models/type-contract-legal';

@Controller('type-contract-legal')
@ApiTags('type-contract-legal')
export class TypeContractLegalController {
  constructor(
    private readonly TypeContractLegalService: TypeContractLegalService,
  ) {}

  @Get('findAll')
  private findAllTypeContractLegals(): any {
    return this.TypeContractLegalService.listTypeContractLegals();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the type contract legal',
    required: true,
    type: String,
  })
  private findOneTypeContractLegal(@Param('uuid') uuid: any): any {
    const uuidTypeContractLegal = uuid;
    if (uuidTypeContractLegal && uuidTypeContractLegal.length > 0) {
      return this.TypeContractLegalService.getTypeContractLegalsByUUID(
        uuidTypeContractLegal,
      );
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object type contract legal',
    type: TypeContractLegal,
  })
  private addTypeContractLegal(@Req() request: any): any {
    const objTypeContractLegal: TypeContractLegal = request.body;
    if (
      objTypeContractLegal &&
      objTypeContractLegal.name &&
      objTypeContractLegal.name.length > 0
    ) {
      return this.TypeContractLegalService.createTypeContractLegal(
        objTypeContractLegal,
      );
    } else {
      return new HttpException(
        'name of TypeContractLegal invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the type contract legal',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object type contract legal',
    type: TypeContractLegal,
  })
  private updateTypeContractLegal(
    @Param('uuid') uuid: any,
    @Req() request: any,
  ): any {
    const uuidTypeContractLegal = uuid;
    const objTypeContractLegal: TypeContractLegal = request.body;
    if (uuidTypeContractLegal && uuidTypeContractLegal.length > 0) {
      if (
        objTypeContractLegal &&
        objTypeContractLegal.name &&
        objTypeContractLegal.name.length > 0
      ) {
        return this.TypeContractLegalService.updateTypeContractLegal(
          uuidTypeContractLegal,
          objTypeContractLegal,
        );
      } else {
        return new HttpException(
          'name of TypeContractLegal invalid',
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
    description: 'UUID of the type contract legal',
    required: true,
    type: String,
  })
  private deleteTypeContractLegal(@Param('uuid') uuid: any): any {
    const uuidTypeContractLegal = uuid;
    if (uuidTypeContractLegal && uuidTypeContractLegal.length > 0) {
      return this.TypeContractLegalService.deleteTypeContractLegal(
        uuidTypeContractLegal,
      );
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
