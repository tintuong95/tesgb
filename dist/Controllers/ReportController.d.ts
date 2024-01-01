import { ReportService } from '../services/core';
import { CreateReportDto, UpdateReportDto } from '../Entities/Dto/core';
import { Report } from '../entities/Report';
import { IReportController } from './Interfaces/IReportController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class ReportController implements IReportController {
    private reportService;
    constructor(reportService: ReportService);
    getAllReports(request: Request, user: UserDto): Promise<Report[]>;
    getReportDetails(id: string, user: UserDto): Promise<Report>;
    createReport(createReportDto: CreateReportDto, user: UserDto): Promise<Report>;
    updateReport(updateReportDto: UpdateReportDto, user: UserDto, id: string): Promise<Report>;
    removeReport(id: string, user: UserDto): Promise<string>;
    restoreReport(id: string, user: UserDto): Promise<string>;
    deleteReport(id: string, user: UserDto): Promise<string>;
}
