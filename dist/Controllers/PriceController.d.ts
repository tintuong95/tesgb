import { PriceItemService, PriceService } from '../services/core';
import { CreatePriceAllDto, UpdatePriceAllDto } from '../Entities/Dto/core';
import { Price } from '../entities/Price';
import { Request } from 'express';
import { IPriceController } from './Interfaces/IPriceController';
import { UserDto } from 'Shared/user.dto';
export declare class PriceController implements IPriceController {
    private priceService;
    private priceItemService;
    constructor(priceService: PriceService, priceItemService: PriceItemService);
    getAllPrices(request: Request, user: UserDto): Promise<Price>;
    getPriceDetails(id: string, user: UserDto): Promise<Price>;
    createPrice(createPriceAllDto: CreatePriceAllDto, user: UserDto): Promise<Price>;
    updatePrice(updatePriceDto: UpdatePriceAllDto, user: UserDto, id: string): Promise<any>;
    removePrice(id: string, user: UserDto): Promise<string>;
    restorePrice(id: string, user: UserDto): Promise<string>;
    deletePrice(id: string, user: UserDto): Promise<string>;
}
