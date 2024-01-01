import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {RoomType} from '../entities/core';
import {RoomTypeController} from '../Controllers/core';
import {RoomTypeService} from '../services/core';

@Module({
	controllers: [RoomTypeController],
	providers: [RoomTypeService],
	imports: [TypeOrmModule.forFeature([RoomType])],
	exports: [TypeOrmModule],
})
export class RoomTypeModule {}
