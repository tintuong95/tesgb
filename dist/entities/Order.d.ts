import { BaseEntity } from 'typeorm';
import * as TYPE from './Types/core';
import { ServiceOrder } from './ServiceOrder';
import { ACCOUNT_RELATION, CUSTOMER_ORDER_RELATION, OTHER_ORDER_RELATION, ROOM_ORDER_RELATION, SERVICE_ORDER_RELATION } from '@contants/relation';
import { CustomerOrder } from './CustomerOrder';
import { RoomOrder } from './RoomOrder';
import { Account } from './Account';
import { OtherOrder } from './OtherOrder';
export declare class Order extends BaseEntity {
    id: string;
    accountId: string;
    status: TYPE.OrderStatus;
    checkInDate: Date;
    checkOutDate: Date;
    numDays: number;
    numNights: number;
    numHours: number;
    numMoreHours: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [CUSTOMER_ORDER_RELATION]: CustomerOrder[];
    [ROOM_ORDER_RELATION]: RoomOrder[];
    [SERVICE_ORDER_RELATION]: ServiceOrder[];
    [OTHER_ORDER_RELATION]: OtherOrder[];
    [ACCOUNT_RELATION]: Account;
}
