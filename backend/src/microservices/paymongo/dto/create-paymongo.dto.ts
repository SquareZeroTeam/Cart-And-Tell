import { ArrayNotEmpty } from "class-validator";

export class CreatePaymongoDto {
    @ArrayNotEmpty()
    data:Array<number>
}