import { ProductService } from '../services/core';
import { CreateProductDto, UpdateProductDto } from '../Entities/Dto/core';
import { Product } from '../entities/Product';
import { IProductController } from './Interfaces/IProductController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class ProductController implements IProductController {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(request: Request, user: UserDto): Promise<Product[]>;
    getProductDetails(id: string, user: UserDto): Promise<Product>;
    createProduct(createProductDto: CreateProductDto, user: UserDto): Promise<Product>;
    updateProduct(updateProductDto: UpdateProductDto, user: UserDto, id: string): Promise<Product>;
    removeProduct(id: string, user: UserDto): Promise<string>;
    restoreProduct(id: string, user: UserDto): Promise<string>;
    deleteProduct(id: string, user: UserDto): Promise<string>;
    countEmployeeByStatus(user: UserDto, request: Request): Promise<string>;
}
