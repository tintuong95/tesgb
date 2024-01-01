import { RevenueService, StockHistoryService, StockService } from '../services/core';
import { CreateStockHistoryDto, UpdateStockHistoryDto } from '../Entities/Dto/core';
import { StockHistory } from '../entities/StockHistory';
import { Request } from 'express';
import { IStockHistoryController } from './Interfaces/IStockHistoryController';
import { UserDto } from 'Shared/user.dto';
export declare class StockHistoryController implements IStockHistoryController {
    private stockHistoryService;
    private stockService;
    private revenueService;
    constructor(stockHistoryService: StockHistoryService, stockService: StockService, revenueService: RevenueService);
    getAllStockHistorys(request: Request, user: UserDto): Promise<StockHistory[]>;
    getStockHistoryDetails(id: string, user: UserDto): Promise<StockHistory>;
    createStockHistory(createStockHistoryDto: CreateStockHistoryDto, user: UserDto): Promise<StockHistory>;
    updateStockHistory(updateStockHistoryDto: UpdateStockHistoryDto, user: UserDto, id: string): Promise<StockHistory>;
    removeStockHistory(id: string, user: UserDto): Promise<string>;
    restoreStockHistory(id: string, user: UserDto): Promise<string>;
    deleteStockHistory(id: string, user: UserDto): Promise<string>;
    getSumTotalImportExportStockHistory(id: string, user: UserDto): Promise<string>;
}
