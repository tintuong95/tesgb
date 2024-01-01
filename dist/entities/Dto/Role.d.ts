export declare class CreateRoleDto {
    memberId: string;
    role: number;
}
declare const UpdateRoleDto_base: import("@nestjs/common").Type<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
}
export {};
