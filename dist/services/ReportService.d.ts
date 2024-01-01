import { Report } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateReportDto, UpdateReportDto } from '../Entities/Dto/core';
import { IReportService } from './Interfaces/IReportService';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class ReportService implements IReportService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Report | any>;
    createAsync(createReportDto: CreateReportDto, user: UserDto): Promise<Report>;
    updateAsync(id: string, updateReportDto: UpdateReportDto, user: UserDto): Promise<Report>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
