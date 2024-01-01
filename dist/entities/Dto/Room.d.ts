import * as TYPE from '../Types/core';
export declare class CreateRoomDto {
    name: string;
    floorId: string;
    roomTypeId: string;
    note: string;
    status: TYPE.RoomStatus;
    accountId: string;
}
declare const UpdateRoomDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoomDto>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
}
export {};
