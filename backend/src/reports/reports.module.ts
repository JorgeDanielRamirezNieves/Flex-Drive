import { Module } from '@nestjs/common';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './service/reports.service';
import { TypeReportsController } from './controllers/type-reports.controller';
import { TypeReportsService } from './service/type-reports.service';

@Module({
  controllers: [ReportsController, TypeReportsController],
  providers: [ReportsService, TypeReportsService]
})
export class ReportsModule {}
