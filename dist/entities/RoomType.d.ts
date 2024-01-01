import { BaseEntity } from 'typeorm';
import { Room } from './Room';
import { ACCOUNT_RELATION, PRICE_RELATION, ROOM_RELATION } from '@contants/relation';
import { Price } from './Price';
import { Account } from './Account';
import * as TYPE from './Types/core';
export declare class RoomType extends BaseEntity {
    id: string;
    accountId: string;
    priceId: string;
    name: string;
    quality: number;
    bed: number;
    note: string;
    bedType: TYPE.BedType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ROOM_RELATION]: Room[];
    [PRICE_RELATION]: Price;
    [ACCOUNT_RELATION]: Account;
}
