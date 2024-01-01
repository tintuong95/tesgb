import { Product } from '@entities/Product';
import { CreateProductDto, UpdateProductDto } from 'Entities/Dto/Product';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IProductController {
    getAllProducts(request: Request, user: UserDto): Promise<Product[]>;
    getProductDetails(id: string, user: UserDto): Promise<Product>;
    createProduct(createProductDto: CreateProductDto, user: UserDto): Promise<Product>;
    updateProduct(updateProductDto: UpdateProductDto, user: UserDto, id: string): Promise<Product>;
    removeProduct(id: string, user: UserDto): Promise<string>;
    restoreProduct(id: string, user: UserDto): Promise<string>;
    deleteProduct(id: string, user: UserDto): Promise<string>;
}
