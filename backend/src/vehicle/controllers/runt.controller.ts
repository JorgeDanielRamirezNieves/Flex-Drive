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
import { RuntService } from '../service/runt.service';
import { TecnicalDetails } from '../models/tecnical-details';
import { Tecnomecanic } from '../models/tecnomecanic';
import { Soat } from '../models/soat';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('runt')
@ApiTags('runt')
export class RuntController {
  constructor(private readonly RuntService: RuntService) {}

  @Get('soats/findAll')
  @UseGuards(AuthGuard)
  private findAllSoats(): any {
    return this.RuntService.listSoats();
  }

  @Get('tecnomecanics/findAll')
  @UseGuards(AuthGuard)
  private findAllTecnomecanics(): any {
    return this.RuntService.listTecnomecanics();
  }

  @Get('tecnicalDetails/findAll')
  @UseGuards(AuthGuard)
  private findAlltecnicalDetails(): any {
    return this.RuntService.listTecnicalDetailss();
  }

  @Get('tecnicalDetails/findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the tecnicalDetails',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneTecnicalDetails(@Param('uuid') uuid: any): any {
    const uuidTecnicalDetails = uuid;
    if (uuidTecnicalDetails && uuidTecnicalDetails.length > 0) {
      return this.RuntService.getTecnicalDetailssByUUID(uuidTecnicalDetails);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('tecnomecanics/findOne/:noCertificate')
  @ApiParam({
    name: 'noCertificate',
    description: 'certificate number of the RTM',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneTecnomecanics(
    @Param('noCertificate') noCertificate: any,
  ): any {
    const uuidRTM = noCertificate;
    if (uuidRTM && uuidRTM.length > 0) {
      return this.RuntService.getTecnomecanicsByNoCertificate(uuidRTM);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('soats/findOne/:noPolicy')
  @ApiParam({
    name: 'noPolicy',
    description: 'policy number of the soat',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneSoat(@Param('noPolicy') noPolicy: any): any {
    const uuidSoat = noPolicy;
    if (uuidSoat && uuidSoat.length > 0) {
      return this.RuntService.getSoatsByNoPolicy(uuidSoat);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('soats/add')
  @ApiBody({
    description: 'Object tecnicalDetails',
    type: Soat,
  })
  @UseGuards(AuthGuard)
  private addSoat(@Req() request: any): any {
    const objSoat: Soat = request.body;
    if (objSoat) {
      return this.RuntService.createSoat(objSoat);
    } else {
      return new HttpException(
        'Object of Soat invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('tecnomecanics/add')
  @ApiBody({
    description: 'Object Tecnomecanics',
    type: Tecnomecanic,
  })
  @UseGuards(AuthGuard)
  private addTecnomecanic(@Req() request: any): any {
    const objTecnomecanic: Tecnomecanic = request.body;
    if (objTecnomecanic) {
      return this.RuntService.createTecnomecanic(objTecnomecanic);
    } else {
      return new HttpException(
        'Object of tecnomecanic invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('tecnicalDetails/add')
  @ApiBody({
    description: 'Object tecnicalDetails',
    type: TecnicalDetails,
  })
  @UseGuards(AuthGuard)
  private addTecnicalDetails(@Req() request: any): any {
    const objTecnicalDetails: TecnicalDetails = request.body;
    if (TecnicalDetails) {
      return this.RuntService.createTecnicalDetails(objTecnicalDetails);
    } else {
      return new HttpException(
        'Object of TecnicalDetails invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('soats/update/:noPolicy')
  @ApiParam({
    name: 'noPolicy',
    description: 'policy number of the soat',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Soat',
    type: Soat,
  })
  @UseGuards(AuthGuard)
  private updateSoat(
    @Param('noPolicy') noPolicy: any,
    @Req() request: any,
  ): any {
    const noPolicySoat = noPolicy;
    const objSoat: Soat = request.body;
    if (noPolicySoat && noPolicySoat.length > 0) {
      if (objSoat) {
        return this.RuntService.updateSoat(noPolicySoat, objSoat);
      } else {
        return new HttpException(
          'Object of soat invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put('tecnicalDetails/update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the tecnicalDetails',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object tecnicalDetails',
    type: TecnicalDetails,
  })
  @UseGuards(AuthGuard)
  private updateTecnicalDetails(
    @Param('uuid') uuid: any,
    @Req() request: any,
  ): any {
    const uuidTecnicalDetails = uuid;
    const objTecnicalDetails: TecnicalDetails = request.body;
    if (uuidTecnicalDetails && uuidTecnicalDetails.length > 0) {
      if (objTecnicalDetails) {
        return this.RuntService.updateTecnicalDetails(
          uuidTecnicalDetails,
          objTecnicalDetails,
        );
      } else {
        return new HttpException(
          'Object of tecnicalDetails invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put('tecnomecanics/update/:noCertificate')
  @ApiParam({
    name: 'noCertificate',
    description: 'certificate number of the RTM',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object Tecnomecanics',
    type: Tecnomecanic,
  })
  @UseGuards(AuthGuard)
  private updateTecnomecanic(
    @Param('noCertificate') noCertificate: any,
    @Req() request: any,
  ): any {
    const noCertificateRTM = noCertificate;
    const objRTM: Tecnomecanic = request.body;
    if (noCertificateRTM && noCertificateRTM.length > 0) {
      if (objRTM) {
        return this.RuntService.updateTecnomecanic(noCertificateRTM, objRTM);
      } else {
        return new HttpException(
          'Object of tecnomecanic invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('soats/delete/:noPolicy')
  @ApiParam({
    name: 'noPolicy',
    description: 'policy number of the soat',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteSoat(@Param('noPolicy') noPolicy: any): any {
    const uuidSoat = noPolicy;
    if (uuidSoat && uuidSoat.length > 0) {
      return this.RuntService.deleteSoat(uuidSoat);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('tecnicalDetails/delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID number of the tecnicalDetails',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteTecnicalDetails(@Param('uuid') uuid: any): any {
    const uuidTecnicalDetails = uuid;
    if (uuidTecnicalDetails && uuidTecnicalDetails.length > 0) {
      return this.RuntService.deleteTecnicalDetails(uuidTecnicalDetails);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('tecnomecanics/delete/:noCertificate')
  @ApiParam({
    name: 'noCertificate',
    description: 'certificate number of the RTM',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteTecnomecanic(@Param('noCertificate') noCertificate: any): any {
    const uuidTecnomecanic = noCertificate;
    if (uuidTecnomecanic && uuidTecnomecanic.length > 0) {
      return this.RuntService.deleteTecnomecanic(uuidTecnomecanic);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
