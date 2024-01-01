import {Unit} from '@entities/Unit';
import {CreateUnitDto, UpdateUnitDto} from 'Entities/Dto/Unit';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IUnitController {
	/**
	 * find all
	 */
	getAllUnits(request: Request, user: UserDto): Promise<Unit[]>;

	/**
	 *
	 * find one
	 */
	getUnitDetails(id: string, user: UserDto): Promise<Unit>;

	/**
	 *
	 * create
	 */
	createUnit(createUnitDto: CreateUnitDto[], user: UserDto): Promise<Unit[]>;

	/**
	 *
	 * update
	 */
	updateUnit(
		updateUnitDto: UpdateUnitDto,
		user: UserDto,
		id: string
	): Promise<Unit>;

	/**
	 *
	 * remove
	 */
	removeUnit(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreUnit(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteUnit(id: string, user: UserDto): Promise<string>;
}
