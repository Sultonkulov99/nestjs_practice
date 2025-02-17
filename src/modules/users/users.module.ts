import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../auth/schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name : User.name, schema : UserSchema}])
  ],
  controllers:[UsersController],
  providers: [UsersService]
})
export class UsersModule {}
