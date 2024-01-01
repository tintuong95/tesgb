import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Promotion} from '../entities/core';
import {Repository} from 'typeorm';
import {CreatePromotionDto, UpdatePromotionDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IPromotionService} from './Interfaces/core';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class PromotionService implements IPromotionService {
	constructor(
		@InjectRepository(Promotion)
		private promotionRepository: Repository<Promotion>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.promotionRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Promotion | any> {
		try {
			const result = await this.promotionRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Promotion Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createPromotionDto: CreatePromotionDto,
		user: UserDto
	): Promise<Promotion> {
		try {
			const result = this.promotionRepository.create(createPromotionDto);
			return await this.promotionRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updatePromotionDto: UpdatePromotionDto,
		user: UserDto
	): Promise<Promotion> {
		try {
			const result = await this.promotionRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Promotion Id ' + id + ' Not Found !');

			_(updatePromotionDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.promotionRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.promotionRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Promotion Id ' + id + ' successfully !';
		throw new NotFoundException('Promotion Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.promotionRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Promotion Id ' + id + ' successfully !';
		throw new NotFoundException('Promotion Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.promotionRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Promotion Id ' + id + ' successfully !';
		throw new NotFoundException('Promotion Id ' + id + ' Not Found !');
	}
}
