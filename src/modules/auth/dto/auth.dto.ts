import { ApiProperty } from "@nestjs/swagger"
import { IsJWT, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @ApiProperty({example:'Shukurulloh'})
    @IsNotEmpty()
    readonly username: string

    @ApiProperty({example:2})
    @IsNotEmpty()
    @IsNumber()
    readonly age: number

    @ApiProperty({example:123456789})
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string
}

export class LoginDto {
    @ApiProperty({example:'Shukurulloh'})
    @IsNotEmpty()
    readonly username: string

    @ApiProperty({example:123456789})
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string
}

export class RefreshTokenDto {
    @ApiProperty()
    @IsJWT()
    @IsString()
    token: string
}
