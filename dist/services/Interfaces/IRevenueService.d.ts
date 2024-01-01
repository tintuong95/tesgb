import { Revenue } from '@entities/Revenue';
import { CreateRevenueDto, UpdateRevenueDto } from 'Entities/Dto/Revenue';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRevenueService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Revenue | any>;
    createAsync(createRevenueDto: CreateRevenueDto, user: UserDto): Promise<Revenue>;
    updateAsync(id: string, updateRevenueDto: UpdateRevenueDto, user: UserDto): Promise<Revenue>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
