import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {RevenueController} from '../Controllers/core';
import {RevenueService} from '../services/core';
import {Revenue} from '@entities/Revenue';

@Module({
	controllers: [RevenueController],
	providers: [RevenueService],
	imports: [TypeOrmModule.forFeature([Revenue])],
	exports: [TypeOrmModule, RevenueService],
})
export class RevenueModule {}
