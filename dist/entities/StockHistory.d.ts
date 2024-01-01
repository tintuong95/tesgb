import { BaseEntity } from 'typeorm';
import * as TYPE from './Types/core';
import { Stock } from './Stock';
import { ACCOUNT_RELATION, MEMBER_RELATION, STOCK_RELATION } from '@contants/relation';
import { Member } from './Member';
import { Account } from './Account';
export declare class StockHistory extends BaseEntity {
    id: string;
    accountId: string;
    stockId: string;
    memberId: string;
    type: TYPE.StockHistoryType;
    quantity: number;
    price: number;
    supplier: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [STOCK_RELATION]: Stock;
    [MEMBER_RELATION]: Member;
    [ACCOUNT_RELATION]: Account;
}
