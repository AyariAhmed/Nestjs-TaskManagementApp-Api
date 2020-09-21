import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4,{message : 'Username Too short'})
    @MaxLength(8,{message : 'Username Too long'})
    username : string;

    @IsString()
    @MinLength(8,{message : 'Password Too short ! weak password !'})
    @MaxLength(20,{message : 'Password Too long'})
    /* @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message : 'Password too weak'}) */
    password : string;
}