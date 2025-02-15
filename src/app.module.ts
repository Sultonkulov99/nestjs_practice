import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({ 
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot("mongodb+srv://Abdukoshim:0bEqB4ywyJll4aAE@cluster0.pkuhx.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0"),
    AuthModule
  ]
})
export class AppModule {}
