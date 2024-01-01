import {Member} from '@entities/Member';
import {CreateMemberDto, UpdateMemberDto} from 'Entities/Dto/Member';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IMemberController {
	/**
	 * find all
	 */
	getAllMembers(request: Request, user: UserDto): Promise<Member[]>;

	/**
	 *
	 * find one
	 */
	getMemberDetails(id: string, user: UserDto): Promise<Member>;

	/**
	 *
	 * create
	 */
	createMember(
		createAccountDto: CreateMemberDto,
		user: UserDto
	): Promise<Member>;

	/**
	 *
	 * update
	 */
	updateMember(
		updateMemberDto: UpdateMemberDto,
		user: UserDto,
		id: string
	): Promise<Member>;

	/**
	 *
	 * remove
	 */
	removeMember(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreMember(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteMember(id: string, user: UserDto): Promise<string>;
}
