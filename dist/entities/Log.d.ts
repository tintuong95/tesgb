import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
export declare class Log extends BaseEntity {
    id: string;
    accountId: string;
    logType: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
