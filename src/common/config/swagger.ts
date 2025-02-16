import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerDocConfig = new DocumentBuilder()
    .setTitle("Learn NestJs")
    .setDescription("Learn advanced in NestJs")
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Developer',
      'https://Sultonqulov99.t.me',
      'abdukhoshim99@gmail.com',
    )
    .build()