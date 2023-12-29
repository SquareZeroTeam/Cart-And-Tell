import { ArrayNotEmpty, Length } from "class-validator";

export class DeleteCarDto {
    @ArrayNotEmpty()
    products:number[];
}