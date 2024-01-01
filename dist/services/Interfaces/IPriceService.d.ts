import { Price } from '@entities/Price';
import { CreatePriceDto, UpdatePriceDto } from 'Entities/Dto/Price';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPriceService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Price | any>;
    createAsync(createPriceDto: CreatePriceDto, user: UserDto): Promise<Price>;
    updateAsync(id: string, updatePriceDto: UpdatePriceDto, user: UserDto): Promise<Price>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
