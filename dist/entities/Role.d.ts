import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
export declare class Role extends BaseEntity {
    id: string;
    memberId: string;
    role: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
