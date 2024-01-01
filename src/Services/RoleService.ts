import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from '../entities/core';
import {Repository} from 'typeorm';
import * as DTO from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IRoleService} from './Interfaces/IRoleService';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class RoleService implements IRoleService {
	constructor(
		@InjectRepository(Role)
		private roleRepository: Repository<Role>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.roleRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Role | any> {
		try {
			const result = await this.roleRepository.findOne({
				where: {id},
			});
			if (!result)
				throw new NotFoundException('Role Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createRoleDto: DTO.CreateRoleDto,
		user: UserDto
	): Promise<Role> {
		try {
			const result = this.roleRepository.create(createRoleDto);
			return await this.roleRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateRoleDto: DTO.UpdateRoleDto,
		user: UserDto
	): Promise<Role> {
		try {
			const result = await this.roleRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Role Id ' + id + ' Not Found !');

			_(updateRoleDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.roleRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roleRepository.softDelete({
			id,
		});
		if (result.affected > 0) return 'Deleted Role Id ' + id + ' successfully !';
		throw new NotFoundException('Role Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roleRepository.restore({
			id,
		});
		if (result.affected > 0) return 'Restore Role Id ' + id + ' successfully !';
		throw new NotFoundException('Role Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roleRepository.delete(id);
		if (result.affected > 0) return 'Deleted Role Id ' + id + ' successfully !';
		throw new NotFoundException('Role Id ' + id + ' Not Found !');
	}
}
