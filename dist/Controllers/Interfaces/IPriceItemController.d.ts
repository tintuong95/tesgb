import { PriceItem } from '@entities/PriceItem';
import { PriceItemType } from '@entities/Types/PriceItem';
import { CreatePriceItemDto, UpdatePriceItemDto } from 'Entities/Dto/PriceItem';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPriceItemController {
    getAllPriceItems(request: Request, user: UserDto): Promise<PriceItem>;
    getPriceItemDetails(id: string, user: UserDto): Promise<PriceItem>;
    createPriceItem(createPriceItemDto: CreatePriceItemDto[], user: UserDto): Promise<PriceItem[]>;
    updatePriceItem(updatePriceItemDto: UpdatePriceItemDto, user: UserDto, id: string, type: PriceItemType): Promise<PriceItem>;
    removePriceItem(id: string, user: UserDto): Promise<string>;
    restorePriceItem(id: string, user: UserDto): Promise<string>;
    deletePriceItem(id: string, user: UserDto): Promise<string>;
}
