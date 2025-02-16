import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.schema/schema';
import { Model } from 'mongoose';
import { LoginDto, RefreshTokenDto, RegisterDto } from './auth.dto/dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel : Model<UserDocument>,
        private jwtService : JwtService
    ){}

    private async generateTokens(username){
        return {
            access_token : await this.jwtService.signAsync({username: username})
        }
    }

    async register(payload: RegisterDto) {

        let exitUser = await this.userModel.findOne({username: payload.username}).exec()

        if(exitUser){
            throw new HttpException('Username alredy exists',HttpStatus.BAD_REQUEST)
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(payload.password, saltOrRounds);

        const create = new this.userModel({
            ...payload,
            password:hash
        })

        create.save()
        return this.generateTokens(create.username)
    }

    async login(payload : LoginDto) {
        let exitUser = await this.userModel.find({username: payload.username, password : payload.password}).exec()
        console.log(exitUser);
        
        if(exitUser.length === 0){
            throw new UnauthorizedException()
        }

        return this.generateTokens(payload.username)
    }

    async refreshToken(payload : RefreshTokenDto) {
        return
    }
}
