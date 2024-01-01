import { Report } from '@entities/Report';
import { CreateReportDto, UpdateReportDto } from 'Entities/Dto/Report';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IReportController {
    getAllReports(request: Request, user: UserDto): Promise<Report[]>;
    getReportDetails(id: string, user: UserDto): Promise<Report>;
    createReport(createReportDto: CreateReportDto, user: UserDto): Promise<Report>;
    updateReport(updateReportDto: UpdateReportDto, user: UserDto, id: string): Promise<Report>;
    removeReport(id: string, user: UserDto): Promise<string>;
    restoreReport(id: string, user: UserDto): Promise<string>;
    deleteReport(id: string, user: UserDto): Promise<string>;
}
