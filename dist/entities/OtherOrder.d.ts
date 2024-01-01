import { BaseEntity } from 'typeorm';
import { Order } from './Order';
import { ACCOUNT_RELATION, ORDER_RELATION } from '@contants/relation';
import { Account } from './Account';
export declare class OtherOrder extends BaseEntity {
    id: string;
    accountId: string;
    orderId: string;
    title: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ORDER_RELATION]: Order;
    [ACCOUNT_RELATION]: Account;
}
