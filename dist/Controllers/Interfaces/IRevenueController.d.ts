import { Revenue } from '@entities/Revenue';
import { CreateRevenueDto, UpdateRevenueDto } from 'Entities/Dto/Revenue';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRevenueController {
    getAllRevenues(request: Request, user: UserDto): Promise<Revenue[]>;
    getRevenueDetails(id: string, user: UserDto): Promise<Revenue>;
    createRevenue(createRevenueDto: CreateRevenueDto, user: UserDto): Promise<Revenue>;
    updateRevenue(updateRevenueDto: UpdateRevenueDto, user: UserDto, id: string): Promise<Revenue>;
    removeRevenue(id: string, user: UserDto): Promise<string>;
    restoreRevenue(id: string, user: UserDto): Promise<string>;
    deleteRevenue(id: string, user: UserDto): Promise<string>;
}
