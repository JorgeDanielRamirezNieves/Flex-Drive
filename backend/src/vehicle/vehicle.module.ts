import { Module } from '@nestjs/common';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { RuntController } from './controllers/runt.controller';
import { TypeSaleController } from './controllers/type-sale.controller';
import { RuntService } from './service/runt.service';
import { TypeSaleService } from './service/type-sale.service';

@Module({
  providers: [VehicleService, RuntService, TypeSaleService],
  controllers: [VehicleController, RuntController, TypeSaleController]
})
export class VehicleModule {}
