import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UsersService) {
        super();
    }

    serializeUser(user: User, done: (err: Error, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err: Error, user: User) => void) {
        const userDB = await this.userService.findUserById(user.id);

        return userDB ? done(null, userDB) : done(null, null);
    }
}