import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateProductDto, UpdateProductDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {UserDto} from 'Shared/user.dto';
import {IProductService} from './Interfaces/IProductService';
import {Request} from 'express';

@Injectable()
export class ProductService implements IProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.productRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Product | any> {
		try {
			const result = await this.productRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Product Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createProductDto: CreateProductDto,
		user: UserDto
	): Promise<Product> {
		try {
			const newProduct = {...createProductDto, accountId: user.accountId};
			const result = this.productRepository.create(newProduct);
			return await this.productRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateProductDto: UpdateProductDto,
		user: UserDto
	): Promise<Product> {
		try {
			const result = await this.productRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Product Id ' + id + ' Not Found !');

			_(updateProductDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.productRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.productRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.productRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.productRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async countProductStatusCurrent(
		user: UserDto,
		request: Request
	): Promise<any> {
		// const {status} = request.query;
		const rs = await this.productRepository
			.createQueryBuilder('products')
			.where(`products.deletedAt IS NULL`)
			.andWhere(`products.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			// .andWhere(`products.status = :status`, {
			// 	status: status,
			// })
			.select('COUNT(*) AS count')
			.getRawOne();
		return rs;
	}
}
