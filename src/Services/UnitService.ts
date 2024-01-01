import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import * as _ from 'lodash';
import {In, Repository} from 'typeorm';
import {CreateUnitDto, UpdateUnitDto} from '../Entities/Dto/core';
import {Unit} from '../entities/core';
import {IUnitService} from './Interfaces/core';

@Injectable()
export class UnitService implements IUnitService {
	constructor(
		@InjectRepository(Unit)
		private unitRepository: Repository<Unit>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {type} = request.query;
			const result = await this.unitRepository
				.createQueryBuilder('units')
				.where(`units.deletedAt IS NULL`)
				// .andWhere(`units.accountId = :accountId`, {
				// 	accountId: `${user.accountId}`,
				// })
				.andWhere(`units.type = :type`, {
					type: `${type}`,
				})
				.getMany();
			if (!result) return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			else return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Unit | any> {
		try {
			const result = await this.unitRepository.findOne({
				where: {id: id},
			});
			if (!result) return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			else return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createUnitDto: CreateUnitDto[],
		user: UserDto
	): Promise<Unit[]> {
		try {
			const result = this.unitRepository.create(createUnitDto);
			return await this.unitRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateUnitDto: UpdateUnitDto,
		user: UserDto
	): Promise<Unit> {
		try {
			const result = await this.unitRepository.findOne({
				where: {id},
			});
			if (!result)
				throw new NotFoundException('Unit Id ' + id + ' Not Found !');

			_(updateUnitDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.unitRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.unitRepository.softDelete({
			id,
		});
		if (result.affected > 0) return 'Deleted Unit Id ' + id + ' successfully !';
		throw new NotFoundException('Unit Id ' + id + ' Not Found !');
	}

	async removeListAsync(ids: string[], user: UserDto): Promise<string> {
		const rs = await this.unitRepository.find({where: {id: In(ids)}});
		const reDelete = await this.unitRepository.softDelete(rs.map((i) => i.id));
		if (reDelete.affected > 0) return 'Deleted Unit successfully !';
		throw new NotFoundException('Unit Ids Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.unitRepository.restore({
			id,
		});
		if (result.affected > 0) return 'Restore Unit Id ' + id + ' successfully !';
		throw new NotFoundException('Unit Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.unitRepository.delete(id);
		if (result.affected > 0) return 'Deleted Unit Id ' + id + ' successfully !';
		throw new NotFoundException('Unit Id ' + id + ' Not Found !');
	}
}
