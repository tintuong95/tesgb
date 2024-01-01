import { Log } from '@entities/Log';
import { CreateLogDto, UpdateLogDto } from 'Entities/Dto/Log';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface ILogService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Log>;
    createAsync(createLogDto: CreateLogDto, user: UserDto): Promise<Log>;
    updateAsync(id: string, updateLogDto: UpdateLogDto, user: UserDto): Promise<Log>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
