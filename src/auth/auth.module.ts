import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  providers: [AuthService, LocalStrategy, UsersService, SessionSerializer],
  controllers: [AuthController],
  imports: [
    UsersModule, 
    PassportModule.register({
      session: true
    })
  ]
})
export class AuthModule {}
