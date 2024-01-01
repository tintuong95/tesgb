import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Staff} from '../entities/core';
import {StaffController} from '../Controllers/core';
import {StaffService} from '../services/core';

@Module({
	controllers: [StaffController],
	providers: [StaffService],
	imports: [TypeOrmModule.forFeature([Staff])],
	exports: [TypeOrmModule],
})
export class StaffModule {}
