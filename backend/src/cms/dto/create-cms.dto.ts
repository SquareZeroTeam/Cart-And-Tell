import Prisma, { CMSType } from "@prisma/client"
import { IS_ENUM, IsEnum, IsString, isEnum } from "class-validator";


export class CreateCmsDto {
    type: Prisma.$Enums.CMSType;
    @IsString()
    html: string;
}
