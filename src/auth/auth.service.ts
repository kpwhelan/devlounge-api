import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findUserByEmail(email);

        if (!user) throw new InvalidCredentialsException;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordsMatch) throw new InvalidCredentialsException;

        return user;
    }
}
