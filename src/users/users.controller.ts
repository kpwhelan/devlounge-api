import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers() {
      return this.usersService.getAllUsers();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.usersService.findUserById(+id);
    }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(+id, dto);
    }
}
