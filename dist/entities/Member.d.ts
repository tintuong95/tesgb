import { BaseEntity } from 'typeorm';
import { Stock } from './Stock';
import { ACCOUNT_RELATION, REVENUE_RELATION, STOCK_HISTORY_RELATION, STOCK_RELATION } from '@contants/relation';
import { StockHistory } from './StockHistory';
import { Account } from './Account';
import { Revenue } from './Revenue';
export declare class Member extends BaseEntity {
    id: string;
    accountId: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    hashPassword(): void;
    comparePassword(attempt: string): boolean;
    [STOCK_RELATION]: Stock[];
    [STOCK_HISTORY_RELATION]: StockHistory[];
    [ACCOUNT_RELATION]: Account;
    [REVENUE_RELATION]: Revenue[];
}
