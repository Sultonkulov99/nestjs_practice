import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerDocConfig } from './common/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('api')

  const documentFactory = () => SwaggerModule.createDocument(app,SwaggerDocConfig)
  SwaggerModule.setup('swagger',app,documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
