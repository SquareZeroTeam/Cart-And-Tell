import { Length, IsNumber, Min, Max } from "class-validator";

export class CreateMerchantProductDto {
    @Length(4,32)
    name: string;
    amount:number;
    @Length(16,256)
    description:string;
    image: string;
}
