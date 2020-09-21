import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4,{message : 'Username Too short'})
    @MaxLength(8,{message : 'Username Too long'})
    username : string;

    @IsString()
    @MinLength(6,{message : 'Password Too short !'})
    @MaxLength(20,{message : 'Password Too long'})
    /* @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message : 'Password too weak'}) */
    password : string;
}