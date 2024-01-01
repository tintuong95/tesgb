import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
export declare class Report extends BaseEntity {
    id: string;
    accountId: string;
    reportType: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
