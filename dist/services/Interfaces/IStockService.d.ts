import { Stock } from '@entities/Stock';
import { CreateStockDto, UpdateStockDto } from 'Entities/Dto/Stock';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IStockService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Stock | any>;
    createAsync(createStockDto: CreateStockDto, user: UserDto): Promise<Stock>;
    updateAsync(id: string, updateStockDto: UpdateStockDto, user: UserDto): Promise<Stock>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
