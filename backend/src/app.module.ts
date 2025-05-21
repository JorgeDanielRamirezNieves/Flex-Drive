import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConectionModule } from './BD/conection/conection.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RequestsModule } from './requests/requests.module';
import { ChatModule } from './chat/chat.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ContractModule } from './contract/contract.module';
import { ConfigModule } from '@nestjs/config';
import { PricesModule } from './prices/prices.module';
import { ServicesRentModule } from './services-rent/services-rent.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConectionModule,
    AuthModule,
    UserModule,
    PricesModule,
    VehicleModule,
    RequestsModule,
    ChatModule,
    ReportsModule,
    ServicesRentModule,
    NotificationsModule,
    ContractModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
