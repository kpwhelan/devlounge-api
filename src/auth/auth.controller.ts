import { Body, Controller,Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }


    @UseGuards(LocalAuthGuard)
    @Post ('/login')
    login(@Request() req) {
        return req.user
    }
}
