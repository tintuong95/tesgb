import { BaseEntity } from 'typeorm';
import { Service } from './Service';
import { ACCOUNT_RELATION, SERVICE_RELATION } from '@contants/relation';
import { Account } from './Account';
export declare class ServiceType extends BaseEntity {
    id: string;
    name: string;
    accountId: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [SERVICE_RELATION]: Service[];
    [ACCOUNT_RELATION]: Account;
}
