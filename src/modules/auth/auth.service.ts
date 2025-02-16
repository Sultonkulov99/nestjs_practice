import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel : Model<UserDocument>,
        private jwtService : JwtService
    ){}

    private async generateTokens(user){
        return {
            access_token : await this.jwtService.sign(user)
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
        
        return this.generateTokens({username : create.username, role : create.role})
    }

    async login(payload : LoginDto) {
        
        let exitUser = await this.userModel.findOne({username: payload.username}).exec()
        
        if(!exitUser){
            throw new UnauthorizedException()
        }

        const isPasswordValid = await bcrypt.compare(payload.password, exitUser.password);

        if (!isPasswordValid) {
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        console.log(exitUser.role)

        return this.generateTokens({username : exitUser.username, role: exitUser.role})
    }

    async refreshToken(payload : RefreshTokenDto) {
        return
    }
}
