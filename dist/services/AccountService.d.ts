import { Account } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from '../Entities/Dto/core';
import { IAccountService } from './Interfaces/IAccountService';
import { UserDto } from 'Shared/user.dto';
export declare class AccountService implements IAccountService {
    private accountRepository;
    constructor(accountRepository: Repository<Account>);
    findOneAsync(id: string): Promise<Account>;
    createAsync(createAccountDto: CreateAccountDto): Promise<Account>;
    updateAsync(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
