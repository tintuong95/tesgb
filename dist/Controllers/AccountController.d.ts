import { CreateAccountDto, UpdateAccountDto } from '../Entities/Dto/core';
import { Account } from '../entities/Account';
import { AccountService } from '../services/core';
import { IAccountController } from './Interfaces/core';
import { UserDto } from 'Shared/user.dto';
export declare class AccountController implements IAccountController {
    private accountService;
    constructor(accountService: AccountService);
    getAllAccounts(): Promise<any>;
    getAccountDetails(user: UserDto): Promise<Account>;
    createAccount(createAccountDto: CreateAccountDto): Promise<Account>;
    updateAccount(updateAccountDto: UpdateAccountDto, user: UserDto): Promise<Account>;
    removeAccount(id: string, user: UserDto): Promise<string>;
    restoreAccount(id: string, user: UserDto): Promise<string>;
    deleteAccount(id: string, user: UserDto): Promise<string>;
}
