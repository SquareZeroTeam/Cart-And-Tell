import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantProductDto } from './create-merchant-product.dto';
import { Transform } from 'class-transformer';
import { Length, IsNumber, Min, IsUrl, IsOptional } from 'class-validator';

export class UpdateMerchantProductDto  {
    @IsOptional()
    @Length(4,32)
    name: string;

    @IsOptional()
    @IsNumber()
    @Transform(({value}) => parseFloat(value))
    @Min(20)
    amount:number;
    
    @IsOptional()
    @Length(16,256)
    description:string;
}
