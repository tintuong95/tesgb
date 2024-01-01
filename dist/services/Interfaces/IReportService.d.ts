import { Report } from '@entities/Report';
import { CreateReportDto, UpdateReportDto } from 'Entities/Dto/Report';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IReportService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Report | any>;
    createAsync(createReportDto: CreateReportDto, user: UserDto): Promise<Report>;
    updateAsync(id: string, updateReportDto: UpdateReportDto, user: UserDto): Promise<Report>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
