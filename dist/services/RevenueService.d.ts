import { Revenue } from '../entities/core';
import { Repository } from 'typeorm';
import * as DTO from '../Entities/Dto/core';
import { IRevenueService } from './Interfaces/IRevenueService';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RevenueService implements IRevenueService {
    private revenueRepository;
    constructor(revenueRepository: Repository<Revenue>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Revenue | any>;
    createAsync(createRevenueDto: DTO.CreateRevenueDto, user: UserDto): Promise<Revenue>;
    updateAsync(id: string, updateRevenueDto: DTO.UpdateRevenueDto, user: UserDto): Promise<Revenue>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    getRevenueAndExpendTotalByTime(request: Request, user: UserDto): Promise<any>;
    getRevenueAndExpendInDate(request: Request, user: UserDto): Promise<any>;
    getRevenueAndExpendInDateByReferenceType(request: Request, user: UserDto): Promise<any>;
    getTotalRevenue(user: UserDto): Promise<any>;
}
