import { BaseEntity } from 'typeorm';
import { ACCOUNT_RELATION, CUSTOMER_RELATION, ORDER_RELATION } from '@contants/relation';
import { Order } from './Order';
import { Customer } from './Customer';
import { Account } from './Account';
export declare class CustomerOrder extends BaseEntity {
    id: string;
    accountId: string;
    orderId: string;
    customerId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ORDER_RELATION]: Order;
    [CUSTOMER_RELATION]: Customer;
    [ACCOUNT_RELATION]: Account;
}
