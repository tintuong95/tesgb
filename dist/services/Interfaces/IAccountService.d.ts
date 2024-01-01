import { Account } from '@entities/Account';
import { CreateAccountDto, UpdateAccountDto } from 'Entities/Dto/Account';
import { UserDto } from 'Shared/user.dto';
export interface IAccountService {
    findOneAsync(id: string): Promise<Account>;
    createAsync(createAccountDto: CreateAccountDto): Promise<Account>;
    updateAsync(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
