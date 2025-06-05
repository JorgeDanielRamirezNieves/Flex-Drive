import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../service/role.service';
import { Role } from '../models/role';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Get('findAll')
  @UseGuards(AuthGuard)
  private findAllRoles(): any {
    return this.RoleService.listRoles();
  }

  @Get('findOne/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the role',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private findOneRole(@Param('uuid') uuid: any): any {
    const uuidRole = uuid;
    if (uuidRole && uuidRole.length > 0) {
      return this.RoleService.getRolesByUUID(uuidRole);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('add')
  @ApiBody({
    description: 'Object role',
    type: Role,
  })
  @UseGuards(AuthGuard)
  private addRole(@Req() request: any): any {
    const objRole: Role = request.body;
    if (objRole && objRole.name && objRole.name.length > 0) {
      return this.RoleService.createRole(objRole);
    } else {
      return new HttpException('name of role invalid', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the role',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Object role',
    type: Role,
  })
  @UseGuards(AuthGuard)
  private updateRole(@Param('uuid') uuid: any, @Req() request: any): any {
    const uuidRole = uuid;
    const objRole: Role = request.body;
    if (uuidRole && uuidRole.length > 0) {
      if (objRole && objRole.name && objRole.name.length > 0) {
        return this.RoleService.updateRole(uuidRole, objRole);
      } else {
        return new HttpException(
          'name of role invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('delete/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'UUID of the role',
    required: true,
    type: String,
  })
  @UseGuards(AuthGuard)
  private deleteRole(@Param('uuid') uuid: any): any {
    const uuidRole = uuid;
    if (uuidRole && uuidRole.length > 0) {
      return this.RoleService.deleteRole(uuidRole);
    } else {
      return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
