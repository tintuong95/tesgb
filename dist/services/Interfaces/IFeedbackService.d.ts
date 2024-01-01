import { Feedback } from '@entities/Feedback';
import { CreateFeedbackDto, UpdateFeedbackDto } from 'Entities/Dto/Feedback';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IFeedbackService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Feedback | any>;
    createAsync(createFeedbackDto: CreateFeedbackDto, user: UserDto): Promise<Feedback>;
    updateAsync(id: string, updateFeedbackDto: UpdateFeedbackDto, user: UserDto): Promise<Feedback>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
