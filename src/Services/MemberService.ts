import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Member} from '../entities/core';
import {Repository} from 'typeorm';

import * as _ from 'lodash';
import {
	CreateMemberDto,
	SigninMemberDto,
	UpdateMemberDto,
} from 'Entities/Dto/core';
import {UserDto} from 'Shared/user.dto';
import {IMemberService} from './Interfaces/IMemberService';
import {ACCOUNT_RELATION} from '@contants/relation';
import {Request} from 'express';

@Injectable()
export class MemberService implements IMemberService {
	private readonly logger = new Logger(MemberService.name);
	constructor(
		@InjectRepository(Member)
		private memberRepository: Repository<Member>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.memberRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Member | any> {
		try {
			const result = await this.memberRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Member Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createMemberDto: CreateMemberDto,
		accountId: string
	): Promise<Member> {
		try {
			createMemberDto.accountId = accountId;
			console.log('hihi', createMemberDto);
			const result = this.memberRepository.create(createMemberDto);
			return await this.memberRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateMemberDto: UpdateMemberDto
	): Promise<Member> {
		try {
			const result = await this.memberRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Member Id ' + id + ' Not Found !');

			_(updateMemberDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.memberRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.memberRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Member Id ' + id + ' successfully !';
		throw new NotFoundException('Member Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.memberRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Member Id ' + id + ' successfully !';
		throw new NotFoundException('Member Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.memberRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Member Id ' + id + ' successfully !';
		throw new NotFoundException('Member Id ' + id + ' Not Found !');
	}

	async signupAsync(signupDto: SigninMemberDto): Promise<Member> {
		try {
			const result = this.memberRepository.create(signupDto);
			return await this.memberRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async signinAsync(signinDto: SigninMemberDto): Promise<Member> {
		try {
			const result = await this.memberRepository.findOne({
				where: {username: signinDto.username},
				relations: [ACCOUNT_RELATION],
			});
			console.log('Tried to access a post that does not exist');
			if (!result)
				throw new NotFoundException(
					'Member ' + signinDto.username + ' Not Found !'
				);
			else if (result && result.comparePassword(signinDto.password)) {
				return result;
			}
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
