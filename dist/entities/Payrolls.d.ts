import { BaseEntity } from 'typeorm';
import { ACCOUNT_RELATION, EMPLOYEE_RELATION } from '@contants/relation';
import { Employee } from './Employees';
import * as TYPE from './Types/core';
import { Account } from './Account';
export declare class Payroll extends BaseEntity {
    id: string;
    accountId: string;
    employeeId: string;
    type: TYPE.PAYROLL_TYPE;
    amount: number;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [EMPLOYEE_RELATION]: Employee;
    [ACCOUNT_RELATION]: Account;
}
