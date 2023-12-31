import Prisma, { CMSType } from "@prisma/client"
import { IS_ENUM, IsEmpty, IsEnum, IsNotEmpty, IsString, MinLength, isEnum } from "class-validator";


export class CreateCmsDto {
    type: Prisma.$Enums.CMSType;
    @IsString()
    @MinLength(1)
    html: string;
}
