import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';
import { MerchantRelation } from '@prisma/client';
import { Transform } from 'class-transformer';
import { Length, IsUrl, IsInt, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class UpdateMerchantDto {
    @IsOptional()
    @Length(4,32)
    name: string;

    @IsOptional()
    @IsUrl()
    website: string;

    @IsOptional()
    @Length(16, 256)
    description:string;

    @IsOptional()
    @IsInt()
    @Transform(({value}) => parseInt(value))
    categoryId:number;

    @IsOptional()
    @IsEnum(MerchantRelation)
    merchantRelationship:MerchantRelation;

    @IsOptional()
    @IsDateString()
    merchantStartValidity:Date;

    @IsOptional()
    @IsDateString()
    merchantEndValidity:Date;
    isVerified:boolean;
    isNotified:boolean;
}
