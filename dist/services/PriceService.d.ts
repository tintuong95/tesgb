import { Price } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatePriceDto, UpdatePriceDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { IPriceService } from './Interfaces/IPriceService';
import { UserDto } from 'Shared/user.dto';
export declare class PriceService implements IPriceService {
    private priceRepository;
    constructor(priceRepository: Repository<Price>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Price | any>;
    createAsync(createPriceDto: CreatePriceDto, user: UserDto): Promise<Price>;
    updateAsync(id: string, updatePriceDto: UpdatePriceDto, user: UserDto): Promise<Price>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
