import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { FinesController } from './controllers/fines.controller';
import { FinesService } from './service/fines.service';
import { PreferencesService } from './service/preferences.service';
import { PreferencesController } from './controllers/preferences.controller';
import { RoleService } from './service/role.service';
import { RoleController } from './controllers/role.controller';
import { TypeDocumentController } from './controllers/type-document.controller';
import { TypeDocumentService } from './service/type-document.service';

@Module({
  providers: [
    UserService,
    FinesService,
    PreferencesService,
    RoleService,
    TypeDocumentService,
  ],
  controllers: [
    UserController,
    FinesController,
    PreferencesController,
    RoleController,
    TypeDocumentController,
  ],
})
export class UserModule {}
