import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {CustomerOrder} from '../entities/core';
import {CustomerOrderController} from '../Controllers/core';
import {CustomerOrderService} from '../services/core';

@Module({
	controllers: [CustomerOrderController],
	providers: [CustomerOrderService],
	imports: [TypeOrmModule.forFeature([CustomerOrder])],
	exports: [TypeOrmModule, CustomerOrderService],
})
export class CustomerOrderModule {}
