import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

// Configuración de Multer para memoria (no guardar en disco)
const multerConfig = {
  storage: memoryStorage(), // Usar memoria en lugar de disco
  fileFilter: (req: any, file: any, cb: any) => {
    // Filtro para aceptar solo imágenes
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Solo se permiten archivos de imagen'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // Límite de 10MB (ImgBB soporta hasta 32MB)
  },
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: any, // Para capturar otros campos del FormData si los hay
  ) {
    // Validar que se haya subido un archivo
    if (!image) {
      throw new BadRequestException('No se ha proporcionado ninguna imagen');
    }

    try {
      // Subir imagen a ImgBB
      const result = (await this.appService.uploadImage(
        image,
        'vehicles',
      )) as any;

      // Guardar en BD
      const imageData = {
        cloudinary_public_id: result.public_id,
        cloudinary_url: result.secure_url,
        original_filename: image.originalname,
        file_size: image.size,
      };

      return {
        message: 'Imagen subida exitosamente a ImgBB',
        data: imageData,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al procesar la imagen: ${error.message}`,
      );
    }
  }

  @Get('generateOTP')
  private generateOTP(): any {
    return this.appService.generateOTP();
  }

  @Post('validateOTP')
  @ApiBody({
    description: 'OTP to validate',
    type: String,
  })
  private validateOTP(@Req() request: any): any {
    const otp = request.body.otp;
    console.log('Validating OTP:', otp);
    if (otp && otp.length > 0) {
      return this.appService.validateOTP(otp);
    } else {
      return new HttpException('OTP invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
