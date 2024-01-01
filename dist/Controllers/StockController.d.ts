import { ProductService, StockService } from '../services/core';
import { CreateProductDto, UpdateStockDto } from '../Entities/Dto/core';
import { Stock } from '../entities/Stock';
import { Request } from 'express';
import { IStockController } from './Interfaces/IStockController';
import { UserDto } from 'Shared/user.dto';
export declare class StockController implements IStockController {
    private readonly stockService;
    private readonly productService;
    constructor(stockService: StockService, productService: ProductService);
    getAllStocks(request: Request, user: UserDto): Promise<Stock[]>;
    getStockDetails(id: string, user: UserDto): Promise<Stock>;
    createStock(createProductDto: CreateProductDto, user: UserDto): Promise<Stock>;
    updateStock(updateStockDto: UpdateStockDto, user: UserDto, id: string): Promise<Stock>;
    removeStock(id: string, user: UserDto): Promise<string>;
    restoreStock(id: string, user: UserDto): Promise<string>;
    deleteStock(id: string, user: UserDto): Promise<string>;
}
