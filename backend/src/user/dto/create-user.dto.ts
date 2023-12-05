import { IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @Length(4,32)
    username: string;

    @Length(8,64)
    @IsStrongPassword()
    password:string;

}
