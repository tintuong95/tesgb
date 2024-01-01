import * as TYPE from '../Types/core';
export declare class CreateRoomTypeDto {
    priceId: string;
    name: string;
    quality: number;
    bed: number;
    note: string;
    accountId: string;
    bedType: TYPE.BedType;
}
declare const UpdateRoomTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoomTypeDto>>;
export declare class UpdateRoomTypeDto extends UpdateRoomTypeDto_base {
}
export {};
