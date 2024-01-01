export declare class CreateServiceTypeDto {
    name: string;
    note: string;
    accountId: string;
}
declare const UpdateServiceTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceTypeDto>>;
export declare class UpdateServiceTypeDto extends UpdateServiceTypeDto_base {
}
export {};
