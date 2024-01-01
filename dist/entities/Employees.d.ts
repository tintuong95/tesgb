import { BaseEntity } from 'typeorm';
import { ACCOUNT_RELATION, PAYROLL_RELATION } from '@contants/relation';
import { Payroll } from './Payrolls';
import { Account } from './Account';
import * as TYPE from './Types/core';
export declare class Employee extends BaseEntity {
    id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    idCard: string;
    phone: string;
    email: string;
    gender: TYPE.GENDER_TYPE;
    status: TYPE.EMPLOYEE_STATUS;
    address: string;
    salary: number;
    position: string;
    hireDate: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [PAYROLL_RELATION]: Payroll[];
    [ACCOUNT_RELATION]: Account;
}
