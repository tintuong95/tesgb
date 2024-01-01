import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
export declare class Feedback extends BaseEntity {
    id: string;
    accountId: string;
    customerId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
