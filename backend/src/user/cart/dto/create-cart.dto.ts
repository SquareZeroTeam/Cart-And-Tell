import {Min, IsInt, IsNotEmpty } from "class-validator";

export class CreateCartDto {
    @IsInt()
    @Min(1)
    quantity:number;

    @IsNotEmpty()
    productId:number;
}
