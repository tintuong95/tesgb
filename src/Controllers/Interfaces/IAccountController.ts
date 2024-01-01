import {Account} from '@entities/Account';
import {CreateAccountDto, UpdateAccountDto} from 'Entities/Dto/Account';
import {UserDto} from 'Shared/user.dto';

export interface IAccountController {
	/**
	 * find all
	 */
	// getAllAccounts(): Promise<Account[]>;

	/**
	 *
	 * find one
	 */
	getAccountDetails(user: UserDto): Promise<Account>;

	/**
	 *
	 * create
	 */
	createAccount(createAccountDto: CreateAccountDto): Promise<Account>;

	/**
	 *
	 * update
	 */
	updateAccount(
		updateAccountDto: UpdateAccountDto,
		user: UserDto
	): Promise<Account>;

	/**
	 *
	 * remove
	 */
	removeAccount(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreAccount(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteAccount(id: string, user: UserDto): Promise<string>;
}
