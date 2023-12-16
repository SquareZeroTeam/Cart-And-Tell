import { Optional } from "@nestjs/common";

export class CreateLivestreamDto {
    @Optional()
    productId:number;
}
