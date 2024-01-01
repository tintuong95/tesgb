import { Product } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../Entities/Dto/core';
import { UserDto } from 'Shared/user.dto';
import { IProductService } from './Interfaces/IProductService';
import { Request } from 'express';
export declare class ProductService implements IProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Product | any>;
    createAsync(createProductDto: CreateProductDto, user: UserDto): Promise<Product>;
    updateAsync(id: string, updateProductDto: UpdateProductDto, user: UserDto): Promise<Product>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    countProductStatusCurrent(user: UserDto, request: Request): Promise<any>;
}
