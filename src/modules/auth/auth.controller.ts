import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './auth.dto/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('register')
    register(@Body() payload : RegisterDto){
        return this.authService.register(payload)
    }

    @Post("login")
    login(@Body() payload : LoginDto) {
        return this.authService.login(payload)
    }

    @Post('refresh-token')
    refreshToken(@Body() payload : RefreshTokenDto) {
        return this.authService.refreshToken(payload)
    }
}
