import { Feedback } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateFeedbackDto, UpdateFeedbackDto } from '../Entities/Dto/core';
import { IFeedbackService } from './Interfaces/core';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class FeedbackService implements IFeedbackService {
    private feedbackRepository;
    constructor(feedbackRepository: Repository<Feedback>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Feedback | any>;
    createAsync(createFeedbackDto: CreateFeedbackDto, user: UserDto): Promise<Feedback>;
    updateAsync(id: string, updateFeedbackDto: UpdateFeedbackDto, user: UserDto): Promise<Feedback>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
