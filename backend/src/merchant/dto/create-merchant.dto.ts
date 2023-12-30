import { IsEmail, Length, IsUrl, IsInt, IsEnum, IsDate, IsDateString } from "class-validator";
import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
enum MerchantRelation {
    MerchantOwner = 'MerchantOwner',
    ExclusiveDistributor = 'ExclusiveDistributor',
    NonExclusiveDistributor = 'NonExclusiveDistributor'
}
export class CreateMerchantDto {
    @Length(4, 32)
    name: string;
    @IsUrl()
    website: string;
    @Length(16, 256)
    description: string;


    categoryId: number;
    @IsEnum(MerchantRelation)
    merchantRelationship: MerchantRelation;
    @IsDateString()
    merchantStartValidity: Date;
    @IsDateString()
    merchantEndValidity: Date;
    userId: number;
}

// model Merchant {
//     id Int @id @default(autoincrement())
//     name String @unique
//     // email String @unique   //Might move it to User model later
//     category Category? @relation(fields: [categoryId],references: [id])
//     categoryId Int?
//     merchant Merchants? @relation(fields: [merchantId],references: [id])
//     merchantId Int?
//     proofOfAuthenticity String?
//     merchantRelationship MerchantRelation @default(MerchantOwner)
//     merchantStartValidity DateTime?
//     merchantEndValidity DateTime?
//     website String @unique
//     image String?
//     products Product[]
//     user User? @relation(fields: [userId], references: [id])
//     userId Int? @unique
//     published Boolean @default(false)
//     isVerified Boolean @default(false)
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt @default(now())
//   }