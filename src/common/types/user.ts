import { User } from "src/modules/auth/schema/auth.schema";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPPER_ADMIN = 'SUPPER_ADMIN'
}

export type TAuthUser = Omit<User, 'password'>