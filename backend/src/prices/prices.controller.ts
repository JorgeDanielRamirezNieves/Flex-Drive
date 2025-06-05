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
import { PricesService } from './prices.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Price } from './models/price';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('prices')
@ApiTags('prices')
export class PricesController {
  constructor(private readonly PriceService: PricesService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllPrices(): any {
    return this.PriceService.listPrices();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Price',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOnePrice(@Param('uuid') uuid: any): any {
    const uuidPrice = uuid;
    if (uuidPrice && uuidPrice.length > 0) {
      return this.PriceService.getPriceByUUID(uuidPrice);
    } else {
      return new HttpException('UUID invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object Price',
    type: Price,
  })
  @UseGuards(AuthGuard)
  private addPrice(@Req() request: any): any {
    const objPrice: Price = request.body;
    if (objPrice) {
      return this.PriceService.createPrice(objPrice);
    } else {
      return new HttpException('name of Price invalid', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Price',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Price',
    type: Price,
  })
  @UseGuards(AuthGuard)
  private updatePrice(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidPrice = uuid;
    const objPrice: Price = request.body;
    if (uuidPrice && uuidPrice.length > 0) {
      if (objPrice) {
        return this.PriceService.updatePrice(uuidPrice, objPrice);
      } else {
        return new HttpException(
          'name of Price invalid',
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
    description: 'UUID of the Price',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deletePrice(@Param('uuid') uuid: any): any {
    const uuidPrice = uuid;
    if (uuidPrice && uuidPrice.length > 0) {
      return this.PriceService.deletePrice(uuidPrice);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
