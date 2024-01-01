export declare class CreateStockDto {
    productId: string;
    accountId: string;
    invertory: number;
}
declare const UpdateStockDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStockDto>>;
export declare class UpdateStockDto extends UpdateStockDto_base {
}
export {};
