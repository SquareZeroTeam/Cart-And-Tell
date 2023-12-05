import { IsEmail, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(8,64)
    @IsStrongPassword()
    password:string;

}
