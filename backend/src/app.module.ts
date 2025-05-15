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
import { ServicesModule } from './services/services.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ContractModule } from './contract/contract.module';
import { ConfigModule } from '@nestjs/config';
import { PricesModule } from './prices/prices.module';

@Module({
  imports: [
    ConectionModule,
    AuthModule,
    UserModule,
    VehicleModule,
    RequestsModule,
    ChatModule,
    ReportsModule,
    ServicesModule,
    NotificationsModule,
    ContractModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PricesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
