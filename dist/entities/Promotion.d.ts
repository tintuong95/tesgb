import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
export declare class Promotion extends BaseEntity {
    id: string;
    accountId: string;
    name: string;
    promotionType: number;
    price: number;
    startDate: string;
    endDate: string;
    condition: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
