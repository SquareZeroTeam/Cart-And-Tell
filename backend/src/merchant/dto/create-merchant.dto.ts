import { IsEmail, Length, IsUrl, IsInt, IsEnum } from "class-validator";
import { Prisma } from "@prisma/client";
enum BrandRelation {
    BrandOwner = 'BrandOwner',
    ExclusiveDistributor = 'ExclusiveDistributor',
    NonExclusiveDistributor = 'NonExclusiveDistributor'
}
export class CreateMerchantDto {
    @Length(4,32)
    name: string;
    @IsUrl()
    website: string;
    @IsInt()
    categoryId:number;
    @IsInt()
    @Length(4,32)
    brandName:string; // If brand is not present then this field will be used
    brandId:number; 
    proofOfAuthenticity:string;
    @IsEnum(BrandRelation)
    brandRelationship:BrandRelation;
    brandStartValidity:Date;
    brandEndValidity:Date;
    image:string;
    userId:number;
}

// model Merchant {
//     id Int @id @default(autoincrement())
//     name String @unique
//     // email String @unique   //Might move it to User model later
//     category Category? @relation(fields: [categoryId],references: [id])
//     categoryId Int?
//     brand Brands? @relation(fields: [brandId],references: [id])
//     brandId Int?
//     proofOfAuthenticity String?
//     brandRelationship BrandRelation @default(BrandOwner)
//     brandStartValidity DateTime?
//     brandEndValidity DateTime?
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