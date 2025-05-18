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
import { TypeSaleService } from '../service/type-sale.service';
import { TypeSale } from '../models/type_sale';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('type-sale')
@ApiTags('type-sale')
export class TypeSaleController {
  constructor(private readonly typeSaleService: TypeSaleService) {}

  @Get('findAll')
  private findAllTypeSales(): any {
    return this.typeSaleService.listTypeSales();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the type sale',
    required: true,
    type: String,
  })
  private findOneTypeSales(@Param('uuid') uuid: any): any {
    const uuidTypeSale = uuid;
    if (uuidTypeSale && uuidTypeSale.length > 0) {
      return this.typeSaleService.getTypeSalesByUUID(uuidTypeSale);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object type sale',
    type: TypeSale,
  })
  private addTypeSale(@Req() peticion: any): any {
    const objTypeSale: TypeSale = peticion.body;
    if (objTypeSale && objTypeSale.name && objTypeSale.name.length > 0) {
      return this.typeSaleService.createTypeSale(objTypeSale);
    } else {
      return new HttpException(
        'name of type sale invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the type sale',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object type sale',
    type: TypeSale,
  })
  private updateTypeSale(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidTypeSale = uuid;
    const objTypeSale: TypeSale = request.body;
    if (uuidTypeSale && uuidTypeSale.length > 0) {
      if (objTypeSale && objTypeSale.name && objTypeSale.name.length > 0) {
        return this.typeSaleService.updateTypeSale(uuidTypeSale, objTypeSale);
      } else {
        return new HttpException(
          'name of type sale invalid',
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
    description: 'UUID of the type sale',
    required: true,
    type: String,
  })
  private deleteTypeSale(@Param('uuid') uuid: any): any {
    const uuidTypeSale = uuid;
    if (uuidTypeSale && uuidTypeSale.length > 0) {
      return this.typeSaleService.deleteTypeSale(uuidTypeSale);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
