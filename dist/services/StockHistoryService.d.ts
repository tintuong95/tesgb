import { StockHistory } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateStockHistoryDto, UpdateStockHistoryDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { UserDto } from 'Shared/user.dto';
export declare class StockHistoryService {
    private stockHistoryRepository;
    constructor(stockHistoryRepository: Repository<StockHistory>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<StockHistory | any>;
    createAsync(createStockHistoryDto: CreateStockHistoryDto, user: UserDto): Promise<StockHistory>;
    updateAsync(id: string, updateStockHistoryDto: UpdateStockHistoryDto, user: UserDto): Promise<StockHistory>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    getStockExportImportTotal(stockId: string, user: UserDto): Promise<any>;
}
