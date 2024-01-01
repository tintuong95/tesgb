import { StockHistory } from '@entities/StockHistory';
import { CreateStockHistoryDto, UpdateStockHistoryDto } from 'Entities/Dto/StockHistory';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IStockHistoryController {
    getAllStockHistorys(request: Request, user: UserDto): Promise<StockHistory[]>;
    getStockHistoryDetails(id: string, user: UserDto): Promise<StockHistory>;
    createStockHistory(createStockHistoryDto: CreateStockHistoryDto, user: UserDto): Promise<StockHistory>;
    updateStockHistory(updateStockHistoryDto: UpdateStockHistoryDto, user: UserDto, id: string): Promise<StockHistory>;
    removeStockHistory(id: string, user: UserDto): Promise<string>;
    restoreStockHistory(id: string, user: UserDto): Promise<string>;
    deleteStockHistory(id: string, user: UserDto): Promise<string>;
}
