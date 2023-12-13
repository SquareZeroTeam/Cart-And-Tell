import { Transform } from "class-transformer";
import { Length, IsNumber, Min, Max, min, IsInt, IsNumberString, IsUrl } from "class-validator";

export class CreateMerchantProductDto {
    @Length(4,32)
    name: string;

    @IsNumber()
    @Transform(({value}) => parseFloat(value))
    @Min(20)
    amount:number;
    
    @Length(16,256)
    description:string;

    @IsUrl()
    website:string;
}