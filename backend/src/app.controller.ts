import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

// Configuración de Multer para memoria (no guardar en disco)
const multerConfig = {
  storage: memoryStorage(), // Usar memoria en lugar de disco
  fileFilter: (req:any, file:any, cb:any) => {
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
      const imgbbResponse = await this.appService.uploadImage(image);

      // Respuesta con datos de ImgBB
      const imageData = {
        url: imgbbResponse.url,
        display_url: imgbbResponse.display_url,
        delete_url: imgbbResponse.delete_url,
      };

      return {
        message: 'Imagen subida exitosamente a ImgBB',
        data: imageData,
      };
    } catch (error) {
      throw new BadRequestException(`Error al procesar la imagen: ${error.message}`);
    }
  }
}
