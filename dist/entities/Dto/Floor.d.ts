export declare class CreateFloorDto {
    name: string;
    note: string;
    accountId: string;
}
declare const UpdateFloorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFloorDto>>;
export declare class UpdateFloorDto extends UpdateFloorDto_base {
}
export {};
