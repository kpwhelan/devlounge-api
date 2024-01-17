import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from "express-session"
import * as passport from "passport"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      name: 'devlounge-cookie',
      secret: '050111041407083114110715',
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Devlounge API')
    .setDescription('Devlounge API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
