import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async uploadImage(file: Express.Multer.File): Promise<{
    success: boolean;
    data: {
      url: string;
      delete_url: string;
      display_url: string;
    };
  }> {
    const apikey = process.env.API_KEY_IMGBB;
    const params = new URLSearchParams();
    params.append('image', file.buffer.toString('base64'));
    params.append('key', apikey || '');
    const url = `https://api.imgbb.com/1/upload`;
    const response = await lastValueFrom(
        this.httpService.post("https://api.imgbb.com/1/upload", params, )
      );

    if (!response.data.success) {
        throw new HttpException('Failed to upload image to ImgBB', HttpStatus.BAD_REQUEST);
      }

      // Verificar si la respuesta fue exitosa
    if (response.data && response.data.data) {
      const res = {
        success: true,
        data: {
          url: response.data.data.url,
          delete_url: response.data.data.delete_url,
          display_url: response.data.data.display_url
        }
      };
      console.info("Imagen cargada")
      return res;
    } else {
      throw new Error('Respuesta inesperada de ImgBB');
    }
  }
}
