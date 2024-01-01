import { Price } from '@entities/Price';
import { CreatePriceDto, UpdatePriceDto } from 'Entities/Dto/Price';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPriceController {
    getAllPrices(request: Request, user: UserDto): Promise<Price>;
    getPriceDetails(id: string, user: UserDto): Promise<Price>;
    createPrice(createPriceDto: CreatePriceDto, user: UserDto): Promise<Price>;
    updatePrice(updatePriceDto: UpdatePriceDto, user: UserDto, id: string): Promise<Price>;
    removePrice(id: string, user: UserDto): Promise<string>;
    restorePrice(id: string, user: UserDto): Promise<string>;
    deletePrice(id: string, user: UserDto): Promise<string>;
}
