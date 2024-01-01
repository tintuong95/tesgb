import {Unit} from '@entities/Unit';
import {CreateUnitDto, UpdateUnitDto} from 'Entities/Dto/Unit';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IUnitService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Unit | any>;

	/**
	 *
	 * create
	 */
	createAsync(createUnitDto: CreateUnitDto[], user: UserDto): Promise<Unit[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateUnitDto: UpdateUnitDto,
		user: UserDto
	): Promise<Unit>;

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
