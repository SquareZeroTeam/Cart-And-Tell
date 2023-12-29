declare enum MerchantRelation {
    MerchantOwner = "MerchantOwner",
    ExclusiveDistributor = "ExclusiveDistributor",
    NonExclusiveDistributor = "NonExclusiveDistributor"
}
export declare class CreateMerchantDto {
    name: string;
    website: string;
    description: string;
    categoryId: number;
    merchantRelationship: MerchantRelation;
    merchantStartValidity: Date;
    merchantEndValidity: Date;
    userId: number;
}
export {};
