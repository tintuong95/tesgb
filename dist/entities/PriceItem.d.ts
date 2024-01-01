import { BaseEntity } from 'typeorm';
import * as TYPE from './Types/core';
import { Account } from './Account';
import { Price } from './Price';
import { ACCOUNT_RELATION, PRICE_RELATION } from '@contants/relation';
export declare class PriceItem extends BaseEntity {
    id: string;
    accountId: string;
    priceId: string;
    priceRoom: number;
    checkInAt: string;
    checkOutAt: string;
    type: TYPE.PriceItemType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
    [PRICE_RELATION]: Price;
}
