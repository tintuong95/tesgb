import * as TYPE from '../Types/core';
export declare class CreateStockHistoryDto {
    stockId: string;
    memberId: string;
    type: TYPE.StockHistoryType;
    quantity: number;
    price: number;
    supplier: string;
    note: string;
    accountId: string;
}
declare const UpdateStockHistoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStockHistoryDto>>;
export declare class UpdateStockHistoryDto extends UpdateStockHistoryDto_base {
}
export {};
