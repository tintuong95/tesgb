import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Account} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateAccountDto, UpdateAccountDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IAccountService} from './Interfaces/IAccountService';
import {UserDto} from 'Shared/user.dto';

@Injectable()
export class AccountService implements IAccountService {
	constructor(
		@InjectRepository(Account)
		private accountRepository: Repository<Account>
	) {}

	async findOneAsync(id: string): Promise<Account> {
		try {
			const result = await this.accountRepository.findOne({
				where: {id},
			});
			if (!result)
				throw new NotFoundException('Account Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(createAccountDto: CreateAccountDto): Promise<Account> {
		try {
			const result = this.accountRepository.create(createAccountDto);
			return await this.accountRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateAccountDto: UpdateAccountDto
	): Promise<Account> {
		try {
			const result = await this.accountRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Account Id ' + id + ' Not Found !');

			_(updateAccountDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.accountRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.accountRepository.softDelete({
			id,
		});
		if (result.affected > 0)
			return 'Deleted Account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.accountRepository.restore({
			id,
		});
		if (result.affected > 0)
			return 'Restore Account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.accountRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}
}
