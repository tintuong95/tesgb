import { LogService } from '../services/core';
import { CreateLogDto, UpdateLogDto } from '../Entities/Dto/core';
import { Log } from '../entities/Log';
import { ILogController } from './Interfaces/ILogController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class LogController implements ILogController {
    private logService;
    constructor(logService: LogService);
    getAllLogs(request: Request, user: UserDto): Promise<Log[]>;
    getLogDetails(id: string, user: UserDto): Promise<Log>;
    createLog(createLogDto: CreateLogDto, user: UserDto): Promise<Log>;
    updateLog(updateLogDto: UpdateLogDto, user: UserDto, id: string): Promise<Log>;
    removeLog(id: string, user: UserDto): Promise<string>;
    restoreLog(id: string, user: UserDto): Promise<string>;
    deleteLog(id: string, user: UserDto): Promise<string>;
}
