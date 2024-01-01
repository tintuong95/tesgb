export declare class CreatePromotionDto {
    name: string;
    promotionType: number;
    price: number;
    startDate: string;
    endDate: string;
    condition: string;
    accountId: string;
}
declare const UpdatePromotionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePromotionDto>>;
export declare class UpdatePromotionDto extends UpdatePromotionDto_base {
}
export {};
