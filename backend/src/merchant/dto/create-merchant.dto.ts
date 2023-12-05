import { IsEmail, Length, IsUrl } from "class-validator";

export class CreateMerchantDto {
    @Length(4,32)
    name: string;
    @IsUrl()
    website: string;
}