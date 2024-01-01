import { Stock } from '@entities/Stock';
import { CreateProductDto } from 'Entities/Dto/Product';
import { UpdateStockDto } from 'Entities/Dto/Stock';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IStockController {
    getAllStocks(request: Request, user: UserDto): Promise<Stock[]>;
    getStockDetails(id: string, user: UserDto): Promise<Stock>;
    createStock(createProductDto: CreateProductDto, user: UserDto): Promise<Stock>;
    updateStock(updateStockDto: UpdateStockDto, user: UserDto, id: string): Promise<Stock>;
    removeStock(id: string, user: UserDto): Promise<string>;
    restoreStock(id: string, user: UserDto): Promise<string>;
    deleteStock(id: string, user: UserDto): Promise<string>;
}
