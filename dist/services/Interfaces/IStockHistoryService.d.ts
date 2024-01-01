import { StockHistory } from '@entities/StockHistory';
import { CreateStockHistoryDto, UpdateStockHistoryDto } from 'Entities/Dto/StockHistory';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IStockHistoryService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<StockHistory | any>;
    createAsync(createStockHistoryDto: CreateStockHistoryDto, user: UserDto): Promise<StockHistory>;
    updateAsync(id: string, updateStockHistoryDto: UpdateStockHistoryDto, user: UserDto): Promise<StockHistory>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    getStockExportImportTotal(stockId: string, user: UserDto): Promise<any>;
}
