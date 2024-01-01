import { Account } from '@entities/Account';
import { CreateAccountDto, UpdateAccountDto } from 'Entities/Dto/Account';
import { UserDto } from 'Shared/user.dto';
export interface IAccountController {
    getAccountDetails(user: UserDto): Promise<Account>;
    createAccount(createAccountDto: CreateAccountDto): Promise<Account>;
    updateAccount(updateAccountDto: UpdateAccountDto, user: UserDto): Promise<Account>;
    removeAccount(id: string, user: UserDto): Promise<string>;
    restoreAccount(id: string, user: UserDto): Promise<string>;
    deleteAccount(id: string, user: UserDto): Promise<string>;
}
