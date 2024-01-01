import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Promotion} from '../entities/core';
import {PromotionController} from '../Controllers/core';
import {PromotionService} from '../services/core';

@Module({
	controllers: [PromotionController],
	providers: [PromotionService],
	imports: [TypeOrmModule.forFeature([Promotion])],
	exports: [TypeOrmModule],
})
export class PromotionModule {}
