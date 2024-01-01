import {Module, forwardRef} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Room} from '../entities/core';
import {RoomController} from '../Controllers/core';
import {RoomService} from '../services/core';
import {OrderModule} from './OrderModule';

@Module({
	controllers: [RoomController],
	providers: [RoomService],
	imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => OrderModule)],
	exports: [TypeOrmModule, RoomService],
})
export class RoomModule {}
