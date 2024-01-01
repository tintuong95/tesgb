import { BaseEntity } from 'typeorm';
import { Account } from './Account';
import { ACCOUNT_RELATION } from '@contants/relation';
import * as TYPE from './Types/core';
export declare class Customer extends BaseEntity {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    birthday: string;
    idCard: string;
    note: string;
    gender: TYPE.GENDER;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
}
