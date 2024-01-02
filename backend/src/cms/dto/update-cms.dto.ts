import Prisma from '@prisma/client';
import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, minLength } from 'class-validator';

export class UpdateCmsDto {
    @IsOptional()
    type: Prisma.$Enums.CMSType;
    @IsOptional()
    @MinLength(1)
    html: string;
}
