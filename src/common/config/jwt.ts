import { JwtSignOptions } from "@nestjs/jwt";

export const JWTAccessOptions : JwtSignOptions = {
    secret : 'j+El3er&nI!n}g~S8623x',
    expiresIn : '5m'
}

export const JWTRefreshOptions : JwtSignOptions = {
    secret : 'e0rE5Fs#543T]q34{4HLL7jsT8/83',
    expiresIn : '1d'
}