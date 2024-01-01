import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Order} from '../entities/core';
import {OrderController} from '../Controllers/core';
import {OrderService, RevenueService} from '../services/core';
import {CustomerModule} from './CustomerModule';
import {RoomOrderModule} from './RoomOrderModule';
import {CustomerOrderModule} from './CustomerOrderModule';
import {ServiceOrderModule} from './ServiceOrderModule';
import {RoomModule} from './RoomModule';
import {RevenueModule} from './RevenueModule';
import {OtherOrderModule} from './OtherOrderModule';

@Module({
	controllers: [OrderController],
	providers: [OrderService, RevenueService],
	imports: [
		TypeOrmModule.forFeature([Order]),
		CustomerModule,
		RoomOrderModule,
		CustomerOrderModule,
		ServiceOrderModule,
		RoomModule,
		RevenueModule,
		OtherOrderModule,
	],
	exports: [TypeOrmModule, OrderService],
})
export class OrderModule {}
