import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../auth/schema/auth.schema';
import { isValidObjectId, Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}

    async getUsers(){
        return await this.userModel.find({role : 'USER'}).exec()
    }

    async createUser(payload : RegisterDto) {

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
        return {
            success : true,
            message : "User added"
        }
    }

    async deleteUser(id : string){
        if(!isValidObjectId(id)) {
            throw new HttpException("Invalide user id format", HttpStatus.BAD_REQUEST)
        }

        const existUser = await this.userModel.findOne({_id : id}).exec()

        if(!existUser){
            throw new HttpException("User not exists", HttpStatus.BAD_REQUEST)
        }

        await this.userModel.findByIdAndDelete({_id : id}).exec()

        return {
            success : true,
            message : "User deleted"
        }
    }
}
