import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Feedback} from '../entities/core';
import {FeedbackController} from '../Controllers/core';
import {FeedbackService} from '../services/core';

@Module({
	controllers: [FeedbackController],
	providers: [FeedbackService],
	imports: [TypeOrmModule.forFeature([Feedback])],
	exports: [TypeOrmModule],
})
export class FeedbackModule {}
