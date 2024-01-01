import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION, PRODUCT_RELATION, STOCK_HISTORY_RELATION } from '@contants/relation';
import { Product } from './Product';
import { StockHistory } from './StockHistory';
export declare class Stock extends BaseEntity {
    id: string;
    accountId: string;
    productId: string;
    inventory: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [STOCK_HISTORY_RELATION]: StockHistory[];
    [PRODUCT_RELATION]: Product;
    [ACCOUNT_RELATION]: Account;
}
