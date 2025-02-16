import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth.schema/schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTAccessOptions } from 'src/common/config/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWTAccessOptions.secret,
            signOptions:{
                expiresIn : JWTAccessOptions.expiresIn
            }
        }),
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
    ],
    controllers: [AuthController],
    providers : [AuthService]
})

export class AuthModule {}
