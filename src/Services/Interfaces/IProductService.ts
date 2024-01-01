import {Product} from '@entities/Product';
import {CreateProductDto, UpdateProductDto} from 'Entities/Dto/Product';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IProductService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Product | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createProductDto: CreateProductDto,
		user: UserDto
	): Promise<Product>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateProductDto: UpdateProductDto,
		user: UserDto
	): Promise<Product>;

	/**
	 *
	 * remove
	 */
	removeAsync(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreAsync(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteAsync(id: string, user: UserDto): Promise<string>;
}
