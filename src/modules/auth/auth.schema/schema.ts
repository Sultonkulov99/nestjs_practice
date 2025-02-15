import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    username: string

    @Prop()
    age: number 

    @Prop()
    password: string 

    @Prop({enum: ['USER','ADMIN'], default:"USER"})
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
