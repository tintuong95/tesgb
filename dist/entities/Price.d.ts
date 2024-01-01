import { BaseEntity } from 'typeorm';
import { RoomType } from './RoomType';
import { ACCOUNT_RELATION, PRICE_ITEM_RELATION, ROOM_TYPE_RELATION } from '@contants/relation';
import * as TYPE from './Types/core';
import { Account } from './Account';
import { PriceItem } from './PriceItem';
export declare class Price extends BaseEntity {
    id: string;
    accountId: string;
    name: string;
    status: TYPE.PriceStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ROOM_TYPE_RELATION]: RoomType[];
    [PRICE_ITEM_RELATION]: PriceItem[];
    [ACCOUNT_RELATION]: Account;
}
