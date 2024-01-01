import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Feedback} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateFeedbackDto, UpdateFeedbackDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IFeedbackService} from './Interfaces/core';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class FeedbackService implements IFeedbackService {
	constructor(
		@InjectRepository(Feedback)
		private feedbackRepository: Repository<Feedback>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.feedbackRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Feedback | any> {
		try {
			const result = await this.feedbackRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Feedback Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createFeedbackDto: CreateFeedbackDto,
		user: UserDto
	): Promise<Feedback> {
		try {
			const result = this.feedbackRepository.create(createFeedbackDto);
			return await this.feedbackRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateFeedbackDto: UpdateFeedbackDto,
		user: UserDto
	): Promise<Feedback> {
		try {
			const result = await this.feedbackRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Feedback Id ' + id + ' Not Found !');

			_(updateFeedbackDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.feedbackRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.feedbackRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Feedback Id ' + id + ' successfully !';
		throw new NotFoundException('Feedback Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.feedbackRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Feedback Id ' + id + ' successfully !';
		throw new NotFoundException('Feedback Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.feedbackRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Feedback Id ' + id + ' successfully !';
		throw new NotFoundException('Feedback Id ' + id + ' Not Found !');
	}
}
