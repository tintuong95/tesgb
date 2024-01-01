import {Account} from '@entities/Account';
import {CreateAccountDto, UpdateAccountDto} from 'Entities/Dto/Account';
import {UserDto} from 'Shared/user.dto';

export interface IAccountService {
	/**
	 * find all
	 */
	// findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string): Promise<Account>;

	/**
	 *
	 * create
	 */
	createAsync(createAccountDto: CreateAccountDto): Promise<Account>;

	/**
	 *
	 * update
	 */
	updateAsync(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;

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
