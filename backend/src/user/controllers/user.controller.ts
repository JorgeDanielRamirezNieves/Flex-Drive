import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllUser(): any {
    return this.UserService.listUsers();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the User',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneUser(@Param('uuid') uuid: any): any {
    const uuidUser = uuid;
    if (uuidUser && uuidUser.length > 0) {
      return this.UserService.getUsersByUUID(uuidUser);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object User',
    type: User,
  })
  private addUser(@Req() request: any): any {
    const objUser: User = request.body;
    if (objUser) {
      return this.UserService.createUser(objUser);
    } else {
      return new HttpException('name of User invalid', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:uuid')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the User',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object User',
    type: User,
  })
  private updateUser(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidUser = uuid;
    const objUser: User = request.body;
    if (uuidUser && uuidUser.length > 0) {
      if (objUser) {
        return this.UserService.updateUser(uuidUser, objUser);
      } else {
        return new HttpException(
          'name of User invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Patch('changeRole')
  @ApiBody({
    description: 'Object User with uuid and new role',
    type: Object,
  })
  @UseGuards(AuthGuard)
  private changeRoleUser(@Req() request: any): any {
    const objUserNewRole = request.body;
    if (objUserNewRole && objUserNewRole.uuid && objUserNewRole.role) {
      return this.UserService.changeRoleUser(objUserNewRole);
    } else {
      return new HttpException(
        'uuid or new role of User invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('changeStatus')
  @ApiBody({
    description: 'Object User with uuid and new role',
    type: Object,
  })
  @UseGuards(AuthGuard)
  private changeStatus(@Req() request: any): any {
    const objUserNewStatus = request.body;
    if (objUserNewStatus && objUserNewStatus.uuid && objUserNewStatus.status) {
      return this.UserService.changeStatus(objUserNewStatus);
    } else {
      return new HttpException(
        'uuid or new role of User invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the User',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteUser(@Param('uuid') uuid: any): any {
    const uuidUser = uuid;
    if (uuidUser && uuidUser.length > 0) {
      return this.UserService.deleteUser(uuidUser);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
