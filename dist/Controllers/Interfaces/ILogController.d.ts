import { Log } from '@entities/Log';
import { CreateLogDto, UpdateLogDto } from 'Entities/Dto/Log';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface ILogController {
    getAllLogs(request: Request, user: UserDto): Promise<Log[]>;
    getLogDetails(id: string, user: UserDto): Promise<Log>;
    createLog(createLogDto: CreateLogDto, user: UserDto): Promise<Log>;
    updateLog(updateAccountDto: UpdateLogDto, user: UserDto, id: string): Promise<Log>;
    removeLog(id: string, user: UserDto): Promise<string>;
    restoreLog(id: string, user: UserDto): Promise<string>;
    deleteLog(id: string, user: UserDto): Promise<string>;
}
