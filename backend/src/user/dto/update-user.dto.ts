import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsStrongPassword, Length, isEnum } from 'class-validator';

enum userStatus {   
    Active = "Active",
    Removed = "Removed",
    Banned = "Banned"
}
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

    @IsOptional()
    @IsEnum(userStatus)
    status:userStatus;
}
