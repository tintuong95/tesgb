import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	Put,
	Delete,
	Req,
	UseGuards,
} from '@nestjs/common';
import {FeedbackService} from '../services/core';
import {CreateFeedbackDto, UpdateFeedbackDto} from '../Entities/Dto/core';
import {Feedback} from '../entities/Feedback';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IFeedbackController} from './Interfaces/IFeedbackController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('feedback')
@ApiTags('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController implements IFeedbackController {
	constructor(private feedbackService: FeedbackService) {}
	@Get('list')
	async getAllFeedbacks(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Feedback[]> {
		return await this.feedbackService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getFeedbackDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Feedback> {
		return await this.feedbackService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createFeedback(
		@Body() createFeedbackDto: CreateFeedbackDto,
		@User() user: UserDto
	): Promise<Feedback> {
		return await this.feedbackService.createAsync(createFeedbackDto, user);
	}

	@Put(':id/update')
	async updateFeedback(
		@Body(ValidationPipe)
		updateFeedbackDto: UpdateFeedbackDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Feedback> {
		return await this.feedbackService.updateAsync(id, updateFeedbackDto, user);
	}

	@Delete(':id/remove')
	async removeFeedback(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.feedbackService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreFeedback(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.feedbackService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteFeedback(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.feedbackService.deleteAsync(id, user);
	}
}
