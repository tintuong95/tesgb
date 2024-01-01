export declare class CreateMemberDto {
    username: string;
    password: string;
    accountId: string;
}
declare const UpdateMemberDto_base: import("@nestjs/common").Type<Partial<CreateMemberDto>>;
export declare class UpdateMemberDto extends UpdateMemberDto_base {
}
export declare class SigninMemberDto {
    username: string;
    password: string;
}
export {};
