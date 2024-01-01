import { BaseEntity } from 'typeorm';
import { ACCOUNT_RELATION, MEMBER_RELATION } from '@contants/relation';
import { Account } from './Account';
import { Member } from './Member';
import * as TYPE from './Types/core';
export declare class Revenue extends BaseEntity {
    id: string;
    referenceId: string;
    referenceType: TYPE.REVENUE_TYPE;
    accountId: string;
    memberId: string;
    amount: number;
    type: TYPE.REVENUE_STATE;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ACCOUNT_RELATION]: Account;
    [MEMBER_RELATION]: Member;
}
