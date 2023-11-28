import { Length } from "class-validator";

export class DeleteCarDto {
    @Length(1)
    products:number[];
}