import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  constructor() {
    this.apiKey = process.env.API_KEY_IMGBB || '';
    this.baseUrl = 'https://api.imgbb.com/1/upload?expiration=600&key=' + this.apiKey;
  }

  getHello(): string {
    return 'Hello World!';
  }

  public async uploadImage(file: Express.Multer.File): Promise<any> {
    if (!this.apiKey) {
      throw new BadRequestException('API Key de ImgBB no configurada');
    }

    const formData = new FormData();
    formData.append('image', file.buffer.toString('base64'));
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new BadRequestException(`Error de ImgBB: ${data.error?.message || 'Error desconocido'}`);
      }

      return data.data;
    } catch (error) {
      throw new BadRequestException(`Error al subir imagen: ${error.message}`);
    }
  }
}
