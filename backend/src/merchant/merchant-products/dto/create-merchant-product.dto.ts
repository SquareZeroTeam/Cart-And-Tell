import { Length, IsNumber, Min } from "class-validator";

export class CreateMerchantProductDto {
    @Length(4,32)
    name: string;
    @IsNumber() 
    @Min(20)
    amount:number;
    @Length(16,256)
    description:string;
    image: string;
}
