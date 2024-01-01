import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {RoomOrder} from '../entities/core';
import {RoomOrderController} from '../Controllers/core';
import {RoomOrderService} from '../services/core';

@Module({
	controllers: [RoomOrderController],
	providers: [RoomOrderService],
	imports: [TypeOrmModule.forFeature([RoomOrder])],
	exports: [TypeOrmModule, RoomOrderService],
})
export class RoomOrderModule {}
