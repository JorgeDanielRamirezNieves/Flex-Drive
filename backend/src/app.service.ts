import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class AppService {
  private otp: string;
  constructor() {
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  public async uploadImage(file: Express.Multer.File, folder: string = 'vehicles') {
    return new Promise((resolve, reject) => {

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          transformation: [
            { width: 1200, height: 800, crop: 'limit' }, // Optimización automática
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });
  }

  public async generateOTP(): Promise<string> {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.otp = otp; 
    return otp;
  }

  public async validateOTP(otp: string): Promise<HttpException> {
    if (this.otp === otp) {
      this.otp = ''; 
      return new HttpException('OTP is valid', 200);
    } else {
      throw new HttpException('Invalid OTP', 400);
    }
  }
}
