import {Product} from '@entities/Product';
import {CreateProductDto, UpdateProductDto} from 'Entities/Dto/Product';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IProductController {
	/**
	 * find all
	 */
	getAllProducts(request: Request, user: UserDto): Promise<Product[]>;

	/**
	 *
	 * find one
	 */
	getProductDetails(id: string, user: UserDto): Promise<Product>;

	/**
	 *
	 * create
	 */
	createProduct(
		createProductDto: CreateProductDto,
		user: UserDto
	): Promise<Product>;

	/**
	 *
	 * update
	 */
	updateProduct(
		updateProductDto: UpdateProductDto,
		user: UserDto,
		id: string
	): Promise<Product>;

	/**
	 *
	 * remove
	 */
	removeProduct(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreProduct(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteProduct(id: string, user: UserDto): Promise<string>;
}
