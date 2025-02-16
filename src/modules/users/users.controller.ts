import { Controller, Delete, Param, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from '../auth/dto/auth.dto';
import { UserRole } from 'src/common/types/user';
import { Roles } from 'src/common/decorators/roles';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get('users/all')
    getUsers(){
        return this.userService.getUsers()
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post("user/add")
    createUser(@Body() payload : RegisterDto){
        return this.userService.createUser(payload)
    }

    @ApiOperation({
        summary: `${UserRole.ADMIN}`
    })
    @ApiBearerAuth()
    @Delete('user:id')
    deleteUser(@Param('id') id : string){
        return this.userService.deleteUser(id)
    }
}
