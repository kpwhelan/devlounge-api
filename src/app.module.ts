import { HttpStatus, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule, loggingMiddleware, providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()]
      }
    }),
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    PostsModule,
  ],
  controllers: [],
})
export class AppModule {}
