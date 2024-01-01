import { Product } from '@entities/Product';
import { CreateProductDto, UpdateProductDto } from 'Entities/Dto/Product';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IProductService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Product | any>;
    createAsync(createProductDto: CreateProductDto, user: UserDto): Promise<Product>;
    updateAsync(id: string, updateProductDto: UpdateProductDto, user: UserDto): Promise<Product>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
