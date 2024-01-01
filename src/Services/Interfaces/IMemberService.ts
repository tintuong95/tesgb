import {Member} from '@entities/Member';
import {
	CreateMemberDto,
	SigninMemberDto,
	UpdateMemberDto,
} from 'Entities/Dto/Member';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IMemberService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Member>;

	/**
	 *
	 * create
	 */
	createAsync(
		createMemberDto: CreateMemberDto,
		accountId: string
	): Promise<Member>;

	/**
	 *
	 * update
	 */
	updateAsync(id: string, updateMemberDto: UpdateMemberDto): Promise<Member>;

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
