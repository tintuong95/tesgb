import { Log } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateLogDto, UpdateLogDto } from '../Entities/Dto/core';
import { ILogService } from './Interfaces/core';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class LogService implements ILogService {
    private logRepository;
    constructor(logRepository: Repository<Log>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Log | any>;
    createAsync(createLogDto: CreateLogDto, user: UserDto): Promise<Log>;
    updateAsync(id: string, updateLogDto: UpdateLogDto, user: UserDto): Promise<Log>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
