export declare class CreateProductDto {
    name: string;
    barcode: number;
    unitId: string;
    accountId: string;
}
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export {};
