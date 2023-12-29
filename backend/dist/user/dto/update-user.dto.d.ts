declare enum userStatus {
    Active = "Active",
    Removed = "Removed",
    Banned = "Banned"
}
export declare class UpdateUserDto {
    email: string;
    password: string;
    isMerchant: boolean;
    status: userStatus;
}
export {};
