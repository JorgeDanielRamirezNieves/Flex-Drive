import { Module } from '@nestjs/common';
import { ServicesRentController } from './services-rent.controller';
import { ServicesRentService } from './services-rent.service';

@Module({
  controllers: [ServicesRentController],
  providers: [ServicesRentService]
})
export class ServicesRentModule {}
