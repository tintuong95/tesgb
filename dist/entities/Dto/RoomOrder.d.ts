export declare class CreatedRoomOrderDto {
    orderId: string;
    roomId: string;
    accountId: string;
}
declare const UpdatedRoomOrderDto_base: import("@nestjs/common").Type<Partial<CreatedRoomOrderDto>>;
export declare class UpdatedRoomOrderDto extends UpdatedRoomOrderDto_base {
}
export {};
