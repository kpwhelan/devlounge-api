import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isArray } from 'class-validator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers() {
      return this.usersService.getAllUsers();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(id, dto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
