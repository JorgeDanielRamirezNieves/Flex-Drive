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
import { ReportsService } from '../service/reports.service';
import { Reports } from '../models/reports';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly ReportsService: ReportsService) {}
  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllReports(): any {
    return this.ReportsService.listReports();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Reports',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneReports(@Param('uuid') uuid: any): any {
    const uuidReports = uuid;
    if (uuidReports && uuidReports.length > 0) {
      return this.ReportsService.getReportsByUUID(uuidReports);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object Reports',
    type: Reports,
  })
  private addReports(@Req() request: any): any {
    const objReports: Reports = request.body;
    if (objReports) {
      return this.ReportsService.createReports(objReports);
    } else {
      return new HttpException(
        'Object of Reports invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the Reports',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Reports',
    type: Reports,
  })
  @UseGuards(AuthGuard)
  private updateReports(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidReports = uuid;
    const objReports: Reports = request.body;
    if (uuidReports && uuidReports.length > 0) {
      if (objReports) {
        return this.ReportsService.updateReports(uuidReports, objReports);
      } else {
        return new HttpException(
          'Object of Reports invalid',
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
    description: 'UUID of the Reports',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteReports(@Param('uuid') uuid: any): any {
    const uuidReports = uuid;
    if (uuidReports && uuidReports.length > 0) {
      return this.ReportsService.deleteReports(uuidReports);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
