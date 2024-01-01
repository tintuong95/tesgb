import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
export declare class Staff extends BaseEntity {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    position: string;
    address: string;
    phone: string;
    email: string;
    salary: number;
    workSchedule: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
