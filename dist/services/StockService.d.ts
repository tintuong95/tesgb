import { Stock } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateStockDto, UpdateStockDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { IStockService } from './Interfaces/IStockService';
import { UserDto } from 'Shared/user.dto';
export declare class StockService implements IStockService {
    private stockRepository;
    constructor(stockRepository: Repository<Stock>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Stock | any>;
    createAsync(createStockDto: CreateStockDto, user: UserDto): Promise<Stock>;
    updateAsync(id: string, updateStockDto: UpdateStockDto, user: UserDto): Promise<Stock>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
