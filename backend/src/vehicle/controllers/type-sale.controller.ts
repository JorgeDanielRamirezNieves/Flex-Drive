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

@Controller('type-sale')
export class TypeSaleController {
  constructor(private readonly typeSaleService: TypeSaleService) {}

  @Get('findAll')
  private findAllTypeSales(): any {
    return this.typeSaleService.listTypeSales();
  }

  @Get('findOne/:uuid')
  private findOneTypeSales(@Param('uuid') uuid: any): any {
    const uuidTypeSale = uuid;
    if (uuidTypeSale && uuidTypeSale.length > 0) {
      return this.typeSaleService.getTypeSalesByUUID(uuidTypeSale);
    } else {
      return new HttpException('uuid no válido', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  private addTypeSale(@Req() peticion: any): any {
    const objTypeSale: TypeSale = peticion.body;
    if (objTypeSale && objTypeSale.name && objTypeSale.name.length > 0) {
      return this.typeSaleService.createTypeSale(objTypeSale);
    } else {
      return new HttpException(
        'nombre de rol no válido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  private updateTypeSale(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidTypeSale = uuid;
    const objTypeSale: TypeSale = request.body;
    if (uuidTypeSale && uuidTypeSale.length > 0) {
      if (objTypeSale && objTypeSale.name && objTypeSale.name.length > 0) {
        return this.typeSaleService.updateTypeSale(uuidTypeSale, objTypeSale);
      } else {
        return new HttpException(
          'nombre de rol no válido',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid no válido', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('delete/:uuid')
  private deleteTypeSale(@Param('uuid') uuid: any): any {
    const uuidTypeSale = uuid;
    if (uuidTypeSale && uuidTypeSale.length > 0) {
      return this.typeSaleService.deleteTypeSale(uuidTypeSale);
    } else {
      return new HttpException('uuid no válido', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
