import { Promotion } from '@entities/Promotion';
import { CreatePromotionDto, UpdatePromotionDto } from 'Entities/Dto/Promotion';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPromotionService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Promotion>;
    createAsync(createPromotionDto: CreatePromotionDto, user: UserDto): Promise<Promotion>;
    updateAsync(id: string, updatePromotionDto: UpdatePromotionDto, user: UserDto): Promise<Promotion>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
