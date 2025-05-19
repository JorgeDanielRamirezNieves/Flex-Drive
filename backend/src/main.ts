import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Flex Drive API Documentation')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('chat')
    .addTag('contract')
    .addTag('notification')
    .addTag('reports')
    .addTag('requests')
    .addTag('services-rent')
    .addTag('user')
    .addTag('vehicle')
    .addTag('type-sale')
    .addTag('role')
    .addTag('type-document')
    .addTag('type-report')
    .addTag('type-notifications')
    .addTag('type-contract')
    .addTag('type-contract-legal')
    .addTag('fines')
    .addTag('runt')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, documentFactory);
  const port = Number(process.env.SERVER_PORT);
  app.enableCors({origins: process.env.CORS_ORIGIN});
  await app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
