import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {OtherOrder} from '../entities/core';
import {OtherOrderController} from '../Controllers/core';
import {OtherOrderService} from '../services/core';

@Module({
	controllers: [OtherOrderController],
	providers: [OtherOrderService],
	imports: [TypeOrmModule.forFeature([OtherOrder])],
	exports: [TypeOrmModule, OtherOrderService],
})
export class OtherOrderModule {}
