import { BaseEntity } from 'typeorm';
import { Room } from './Room';
import { ACCOUNT_RELATION, ROOM_RELATION } from '@contants/relation';
import { Account } from './Account';
export declare class Floor extends BaseEntity {
    id: string;
    name: string;
    accountId: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [ROOM_RELATION]: Room[];
    [ACCOUNT_RELATION]: Account;
}
