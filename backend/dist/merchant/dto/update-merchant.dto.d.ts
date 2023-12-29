import { MerchantRelation } from '@prisma/client';
export declare class UpdateMerchantDto {
    name: string;
    website: string;
    description: string;
    categoryId: number;
    merchantRelationship: MerchantRelation;
    merchantStartValidity: Date;
    merchantEndValidity: Date;
    isVerified: boolean;
}
