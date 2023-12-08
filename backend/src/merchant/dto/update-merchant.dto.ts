import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';
import { MerchantRelation } from '@prisma/client';
import { Transform } from 'class-transformer';
import { Length, IsUrl, IsInt, IsEnum, IsDateString } from 'class-validator';

export class UpdateMerchantDto {
    @Length(4,32)
    name: string;
    @IsUrl()
    website: string;
    @Length(16, 256)
    description:string;
    @IsInt()
    @Transform(({value}) => parseInt(value))
    categoryId:number;
    @IsEnum(MerchantRelation)
    merchantRelationship:MerchantRelation;
    @IsDateString()
    merchantStartValidity:Date;
    @IsDateString()
    merchantEndValidity:Date;
}
