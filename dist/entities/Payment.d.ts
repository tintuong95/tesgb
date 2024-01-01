import { BaseEntity } from 'typeorm';
import { ACCOUNT_RELATION } from '@contants/relation';
import { Account } from './Account';
import * as TYPE from './Types/core';
export declare class Payment extends BaseEntity {
    id: number;
    accountId: string;
    option: TYPE.PAYMENT_OPTION;
    type: TYPE.ACCOUNT_TYPE;
    amount: number;
    description: string;
    expiredAt: Date;
    signature: string;
    status: TYPE.PAYMENT_STATUS;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    [ACCOUNT_RELATION]: Account;
}
