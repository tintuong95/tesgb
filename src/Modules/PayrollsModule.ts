import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Payroll} from '../entities/core';
import {PayrollController} from '../Controllers/core';
import {PayrollsService} from '../services/core';
import {RevenueModule} from './RevenueModule';

@Module({
	controllers: [PayrollController],
	providers: [PayrollsService],
	imports: [TypeOrmModule.forFeature([Payroll]), RevenueModule],
	exports: [TypeOrmModule],
})
export class PayrollModule {}
