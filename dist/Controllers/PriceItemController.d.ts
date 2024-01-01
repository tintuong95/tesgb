import { PriceItemService } from '../services/core';
import { CreatePriceItemDto, UpdatePriceItemDto } from '../Entities/Dto/core';
import { PriceItem } from '../entities/PriceItem';
import { Request } from 'express';
import { IPriceItemController } from './Interfaces/IPriceItemController';
import { UserDto } from 'Shared/user.dto';
import { PriceItemType } from '@entities/Types/PriceItem';
export declare class PriceItemController implements IPriceItemController {
    private priceItemService;
    constructor(priceItemService: PriceItemService);
    getAllPriceItems(request: Request, user: UserDto): Promise<PriceItem>;
    getPriceItemDetails(id: string, user: UserDto): Promise<PriceItem>;
    createPriceItem(createPriceItemDto: CreatePriceItemDto[]): Promise<PriceItem[]>;
    updatePriceItem(updatePriceItemDto: UpdatePriceItemDto, user: UserDto, id: string, type: PriceItemType): Promise<PriceItem>;
    removePriceItem(id: string, user: UserDto): Promise<string>;
    restorePriceItem(id: string, user: UserDto): Promise<string>;
    deletePriceItem(id: string, user: UserDto): Promise<string>;
}
