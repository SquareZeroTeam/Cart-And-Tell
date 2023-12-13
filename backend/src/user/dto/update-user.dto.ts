import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsOptional, IsStrongPassword, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @Length(8,64)
    @IsStrongPassword()
    password:string;
    
    @IsOptional()
    @IsBoolean()
    isMerchant: boolean;
}
