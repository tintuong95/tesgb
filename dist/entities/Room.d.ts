import { BaseEntity } from 'typeorm';
import { RoomType } from './RoomType';
import { ACCOUNT_RELATION, FLOOR_RELATION, ROOM_ORDER_RELATION, ROOM_TYPE_RELATION } from '@contants/relation';
import { Floor } from './Floor';
import * as TYPE from './Types/core';
import { Account } from './Account';
import { RoomOrder } from './RoomOrder';
export declare class Room extends BaseEntity {
    id: string;
    name: string;
    floorId: string;
    roomTypeId: string;
    accountId: string;
    note: string;
    status: TYPE.RoomStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ROOM_TYPE_RELATION]: RoomType;
    [FLOOR_RELATION]: Floor;
    [ACCOUNT_RELATION]: Account;
    [ROOM_ORDER_RELATION]: RoomOrder[];
}
