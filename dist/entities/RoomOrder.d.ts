import { BaseEntity } from 'typeorm';
import { Order } from './Order';
import { ACCOUNT_RELATION, ORDER_RELATION, ROOM_RELATION } from '@contants/relation';
import { Account } from './Account';
import { Room } from './Room';
export declare class RoomOrder extends BaseEntity {
    id: string;
    accountId: string;
    orderId: string;
    roomId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ORDER_RELATION]: Order;
    [ROOM_RELATION]: Room;
    [ACCOUNT_RELATION]: Account;
}
