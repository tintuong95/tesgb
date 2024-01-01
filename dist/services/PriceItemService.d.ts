import { PriceItem } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatePriceItemDto, UpdatePriceItemDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { IPriceItemService } from './Interfaces/IPriceItemService';
import { UserDto } from 'Shared/user.dto';
import { PriceItemType } from '@entities/Types/PriceItem';
export declare class PriceItemService implements IPriceItemService {
    private priceItemRepository;
    constructor(priceItemRepository: Repository<PriceItem>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<PriceItem | any>;
    createAsync(createPriceItemDto: CreatePriceItemDto[]): Promise<PriceItem[]>;
    updateAsync(priceId: string, type: PriceItemType, updatePriceItemDto: UpdatePriceItemDto): Promise<PriceItem>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
