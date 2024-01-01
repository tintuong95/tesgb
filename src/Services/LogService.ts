import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Log} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateLogDto, UpdateLogDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {ILogService} from './Interfaces/core';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class LogService implements ILogService {
	constructor(
		@InjectRepository(Log)
		private logRepository: Repository<Log>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.logRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Log | any> {
		try {
			const result = await this.logRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result) throw new NotFoundException('Log Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(createLogDto: CreateLogDto, user: UserDto): Promise<Log> {
		try {
			const result = this.logRepository.create(createLogDto);
			return await this.logRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateLogDto: UpdateLogDto,
		user: UserDto
	): Promise<Log> {
		try {
			const result = await this.logRepository.findOne({where: {id}});
			if (!result) throw new NotFoundException('Log Id ' + id + ' Not Found !');

			_(updateLogDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.logRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.logRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0) return 'Deleted Log Id ' + id + ' successfully !';
		throw new NotFoundException('Log Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.logRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0) return 'Restore Log Id ' + id + ' successfully !';
		throw new NotFoundException('Log Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.logRepository.delete(id);
		if (result.affected > 0) return 'Deleted Log Id ' + id + ' successfully !';
		throw new NotFoundException('Log Id ' + id + ' Not Found !');
	}
}
