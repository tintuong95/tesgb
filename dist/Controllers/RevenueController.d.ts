import { RevenueService } from '../services/core';
import { Revenue } from '../Entities/core';
import { CreateRevenueDto, UpdateRevenueDto } from '@entities/DTO/core';
import { IRevenueController } from './Interfaces/IRevenueController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RevenueController implements IRevenueController {
    private revenueService;
    constructor(revenueService: RevenueService);
    getAllRevenues(request: Request, user: UserDto): Promise<Revenue[]>;
    getRevenueDetails(id: string, user: UserDto): Promise<Revenue>;
    createRevenue(createRevenueDto: CreateRevenueDto, user: UserDto): Promise<Revenue>;
    updateRevenue(updateRevenueDto: UpdateRevenueDto, user: UserDto, id: string): Promise<Revenue>;
    removeRevenue(id: string, user: UserDto): Promise<string>;
    restoreRevenue(id: string, user: UserDto): Promise<string>;
    deleteRevenue(id: string, user: UserDto): Promise<string>;
    getRevenueAndExpendTotalByMonth(request: Request, user: UserDto): Promise<string>;
    getRevenueAndExpendInDate(request: Request, user: UserDto): Promise<string>;
    getRevenueAndExpendInDateReference(request: Request, user: UserDto): Promise<string>;
    getRevenueAndExpendTotal(request: Request, user: UserDto): Promise<string>;
}
