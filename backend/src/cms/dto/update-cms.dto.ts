import Prisma from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCmsDto {
    @IsOptional()
    type: Prisma.$Enums.CMSType;
    @IsOptional()
    @IsString()
    html: string;

}
