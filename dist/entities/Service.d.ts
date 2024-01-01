import { BaseEntity } from 'typeorm';
import * as TYPE from './Types/core';
import { ServiceType } from './ServiceType';
import { ACCOUNT_RELATION, SERVICE_ORDER_RELATION, SERVICE_TYPE_RELATION, UNIT_RELATION } from '@contants/relation';
import { ServiceOrder } from './ServiceOrder';
import { Account } from './Account';
import { Unit } from './Unit';
export declare class Service extends BaseEntity {
    id: string;
    accountId: string;
    name: string;
    serviceTypeId: string;
    unitId: string;
    price: number;
    inventory: number;
    status: TYPE.ServiceStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [SERVICE_TYPE_RELATION]: ServiceType;
    [SERVICE_ORDER_RELATION]: ServiceOrder[];
    [ACCOUNT_RELATION]: Account;
    [UNIT_RELATION]: Unit;
}
