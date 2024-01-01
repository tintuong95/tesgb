import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Report} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateReportDto, UpdateReportDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IReportService} from './Interfaces/IReportService';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class ReportService implements IReportService {
	constructor(
		@InjectRepository(Report)
		private reportRepository: Repository<Report>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.reportRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Report | any> {
		try {
			const result = await this.reportRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Report Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createReportDto: CreateReportDto,
		user: UserDto
	): Promise<Report> {
		try {
			const result = this.reportRepository.create(createReportDto);
			return await this.reportRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateReportDto: UpdateReportDto,
		user: UserDto
	): Promise<Report> {
		try {
			const result = await this.reportRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Report Id ' + id + ' Not Found !');

			_(updateReportDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.reportRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.reportRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Report Id ' + id + ' successfully !';
		throw new NotFoundException('Report Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.reportRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Report Id ' + id + ' successfully !';
		throw new NotFoundException('Report Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.reportRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Report Id ' + id + ' successfully !';
		throw new NotFoundException('Report Id ' + id + ' Not Found !');
	}
}
