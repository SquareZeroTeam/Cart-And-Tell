import { IsBoolean, IsBooleanString, IsEmail, IsStrongPassword, Length, isBoolean } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(8,64)
    @IsStrongPassword()
    password:string;
    @IsBoolean()
    isMerchant: boolean;
}
