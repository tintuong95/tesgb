import { BaseEntity } from 'typeorm';
import { Service } from './Service';
import { ACCOUNT_RELATION, ORDER_RELATION, SERVICE_RELATION } from '@contants/relation';
import { Order } from './Order';
import { Account } from './Account';
export declare class ServiceOrder extends BaseEntity {
    id: string;
    accountId: string;
    orderId: string;
    serviceId: string;
    quanlity: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [SERVICE_RELATION]: Service;
    [ORDER_RELATION]: Order;
    [ACCOUNT_RELATION]: Account;
}
