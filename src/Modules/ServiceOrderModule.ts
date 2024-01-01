import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ServiceOrder} from '../entities/core';
import {ServiceOrderController} from '../Controllers/core';
import {ServiceOrderService} from '../services/core';

@Module({
	controllers: [ServiceOrderController],
	providers: [ServiceOrderService],
	imports: [TypeOrmModule.forFeature([ServiceOrder])],
	exports: [TypeOrmModule, ServiceOrderService],
})
export class ServiceOrderModule {}
