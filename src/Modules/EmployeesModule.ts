import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Employee} from '../entities/core';
import {EmployeeController} from '../Controllers/core';
import {EmployeesService} from '../services/core';

@Module({
	controllers: [EmployeeController],
	providers: [EmployeesService],
	imports: [TypeOrmModule.forFeature([Employee])],
	exports: [TypeOrmModule],
})
export class EmployeesModule {}
