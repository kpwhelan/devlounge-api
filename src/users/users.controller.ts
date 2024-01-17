import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    getAllUsers() {
      return this.usersService.getAllUsers();
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    @UseGuards(AuthenticatedGuard)
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @UseGuards(AuthenticatedGuard)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(id, dto);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
