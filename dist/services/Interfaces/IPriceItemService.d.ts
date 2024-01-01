import { PriceItem } from '@entities/PriceItem';
import { PriceItemType } from '@entities/Types/PriceItem';
import { CreatePriceItemDto, UpdatePriceItemDto } from 'Entities/Dto/PriceItem';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPriceItemService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<PriceItem | any>;
    createAsync(createPriceItemDto: CreatePriceItemDto[], user: UserDto): Promise<PriceItem[]>;
    updateAsync(priceId: string, type: PriceItemType, updatePriceItemDto: UpdatePriceItemDto): Promise<PriceItem>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
