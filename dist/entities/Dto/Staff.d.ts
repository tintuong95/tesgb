export declare class CreateStaffDto {
    firstName: string;
    lastName: string;
    position: string;
    address: string;
    phone: string;
    email: string;
    salary: number;
    workSchedule: string;
    accountId: string;
}
declare const UpdateStaffDto_base: import("@nestjs/common").Type<Partial<CreateStaffDto>>;
export declare class UpdateStaffDto extends UpdateStaffDto_base {
}
export {};
