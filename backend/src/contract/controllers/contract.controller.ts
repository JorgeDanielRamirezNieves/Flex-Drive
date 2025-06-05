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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ContractService } from '../service/contract.service';
import { Contract } from '../models/contract';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly ContractService: ContractService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllContract(): any {
    return this.ContractService.listContracts();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Contract',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneContract(@Param('uuid') uuid: any): any {
    const uuidContract = uuid;
    if (uuidContract) {
      return this.ContractService.getContractsByUUID(uuidContract);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: "Object Contract's Contract",
    type: Contract,
  })
  @UseGuards(AuthGuard)
  private addContract(@Req() request: any): any {
    const objContract: Contract = request.body;
    if (objContract) {
      return this.ContractService.createContract(objContract);
    } else {
      return new HttpException(
        'name of Contract invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: "UUID of the Contract's Contract",
    required: true,
    type: String,
  })
  @ApiBody({
    description: "Object Contract's Contract",
    type: Contract,
  })
  @UseGuards(AuthGuard)
  private updateContract(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidContract = uuid;
    const objContract: Contract = request.body;
    if (uuidContract && uuidContract.length > 0) {
      if (objContract) {
        return this.ContractService.updateContract(uuidContract, objContract);
      } else {
        return new HttpException(
          'name of Contract invalid',
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
    description: "UUID of the Contract's Contract",
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteContract(@Param('uuid') uuid: any): any {
    const uuidContract = uuid;
    if (uuidContract && uuidContract.length > 0) {
      return this.ContractService.deleteContract(uuidContract);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
