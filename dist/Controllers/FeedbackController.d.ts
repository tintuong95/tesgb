import { FeedbackService } from '../services/core';
import { CreateFeedbackDto, UpdateFeedbackDto } from '../Entities/Dto/core';
import { Feedback } from '../entities/Feedback';
import { IFeedbackController } from './Interfaces/IFeedbackController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class FeedbackController implements IFeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getAllFeedbacks(request: Request, user: UserDto): Promise<Feedback[]>;
    getFeedbackDetails(id: string, user: UserDto): Promise<Feedback>;
    createFeedback(createFeedbackDto: CreateFeedbackDto, user: UserDto): Promise<Feedback>;
    updateFeedback(updateFeedbackDto: UpdateFeedbackDto, user: UserDto, id: string): Promise<Feedback>;
    removeFeedback(id: string, user: UserDto): Promise<string>;
    restoreFeedback(id: string, user: UserDto): Promise<string>;
    deleteFeedback(id: string, user: UserDto): Promise<string>;
}
