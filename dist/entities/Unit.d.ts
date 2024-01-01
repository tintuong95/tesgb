import { BaseEntity } from 'typeorm';
import * as TYPE from './Types/core';
import { PRODUCT_RELATION, SERVICE_RELATION } from '@contants/relation';
import { Product } from './Product';
import { Service } from './Service';
export declare class Unit extends BaseEntity {
    id: string;
    name: string;
    type: TYPE.UnitType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    generateId(): void;
    [PRODUCT_RELATION]: Product[];
    [SERVICE_RELATION]: Service[];
}
