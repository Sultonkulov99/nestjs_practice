import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.schema/schema';
import { Model } from 'mongoose';
import { RegisterDto } from './auth.dto/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}

    async register(payload: RegisterDto) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(payload.password, saltOrRounds);

        const create = new this.userModel({
            ...payload,
            password:hash
        })

        create.save()
        return {
            status:201,
            message:"create user"
        }
    }
}
