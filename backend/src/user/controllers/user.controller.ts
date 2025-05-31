import { Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { User, UserNewRole } from '../models/user';



@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get('findAll')
    private findAllUser(): any {
        return this.UserService.listUsers();
    }

    @Get('findOne/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the User",
        required: true,
        type: String,
    })
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
        description: "Object User",
        type: User,
    })
    private addUser(@Req() request: any): any {
        const objUser: User = request.body;
        if (objUser) {
            return this.UserService.createUser(objUser);
        } else {
            return new HttpException(
                'name of User invalid',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('update/:uuid')
    @ApiParam({
        name: 'uuid',
        description: "UUID of the User",
        required: true,
        type: String,
    })
    @ApiBody({
        description: "Object User",
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
        description: "Object User with uuid and new role",
        type: UserNewRole,
    })
    private changeRoleUser(@Req() request: any): any {
        const objUserNewRole: UserNewRole = request.body;
        if (objUserNewRole && objUserNewRole.uuid && objUserNewRole.newRole) {
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
        description: "Object User with uuid and new role",
        type: UserNewRole,
    })
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
        description: "UUID of the User",
        required: true,
        type: String,
    })
    private deleteUser(@Param('uuid') uuid: any): any {
        const uuidUser = uuid;
        if (uuidUser && uuidUser.length > 0) {
            return this.UserService.deleteUser(uuidUser);
        } else {
            return new HttpException('uuid invalid', HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
