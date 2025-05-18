import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { TypeReportsService } from '../service/type-reports.service';
import { TypeReport } from '../models/type-report';

@Controller('type-reports')
@ApiTags('type-report')
export class TypeReportsController {
    constructor(private readonly TypeReportService: TypeReportsService) {}
        
          @Get('findAll')
          private findAllTypeReports(): any {
            return this.TypeReportService.listTypeReports();
          }
        
          @Get('findOne/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type report',
            required: true,
            type: String,
          })
          private findOneTypeReport(@Param('uuid') uuid: any): any {
            const uuidTypeReport = uuid;
            if (uuidTypeReport && uuidTypeReport.length > 0) {
              return this.TypeReportService.getTypeReportsByUUID(uuidTypeReport);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
        
          @Post('add')
          @ApiBody({
            description: 'Object type report',
            type: TypeReport,
          })
          private addTypeReport(@Req() request: any): any {
            const objTypeReport: TypeReport = request.body;
            if (objTypeReport && objTypeReport.name && objTypeReport.name.length > 0) {
              return this.TypeReportService.createTypeReport(objTypeReport);
            } else {
              return new HttpException(
                'name of TypeReport invalid',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        
          @Put('update/:uuid')
          @ApiParam({
            name: 'uuid',
            description: 'UUID of the type report',
            required: true,
            type: String,
          })
          @ApiBody({
            description: 'Object type report',
            type: TypeReport,
          })
          private updateTypeReport(@Param('uuid') uuid: any, @Req() request: any): any {
            const uuidTypeReport = uuid;
            const objTypeReport: TypeReport = request.body;
            if (uuidTypeReport && uuidTypeReport.length > 0) {
              if (objTypeReport && objTypeReport.name && objTypeReport.name.length > 0) {
                return this.TypeReportService.updateTypeReport(uuidTypeReport, objTypeReport);
              } else {
                return new HttpException(
                  'name of TypeReport invalid',
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
            description: 'UUID of the type report',
            required: true,
            type: String,
          })
          private deleteTypeReport(@Param('uuid') uuid: any): any {
            const uuidTypeReport = uuid;
            if (uuidTypeReport && uuidTypeReport.length > 0) {
              return this.TypeReportService.deleteTypeReport(uuidTypeReport);
            } else {
              return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
            }
          }
}
