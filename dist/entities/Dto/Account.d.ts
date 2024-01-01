export declare class CreateAccountDto {
    email: string;
    nameHotel: string;
    address: string;
    phone: string;
    codeBank: string;
    nameBank: string;
    accountBank: number;
    expiredAt: Date;
}
declare const UpdateAccountDto_base: import("@nestjs/common").Type<Partial<CreateAccountDto>>;
export declare class UpdateAccountDto extends UpdateAccountDto_base {
}
export {};
