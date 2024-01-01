import { BaseEntity } from 'typeorm';
import { Stock } from './Stock';
import { ACCOUNT_RELATION, STOCK_RELATION, UNIT_RELATION } from '@contants/relation';
import { Account } from './Account';
import { Unit } from './Unit';
export declare class Product extends BaseEntity {
    id: string;
    barcode: number;
    name: string;
    accountId: string;
    unitId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    generateBarcode(): void;
    [STOCK_RELATION]: Stock;
    [UNIT_RELATION]: Unit;
    [ACCOUNT_RELATION]: Account;
}
