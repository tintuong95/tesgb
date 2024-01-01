import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Customer} from '../entities/core';
import {CustomerController} from '../Controllers/core';
import {CustomerService} from '../services/core';

@Module({
	controllers: [CustomerController],
	providers: [CustomerService],
	imports: [TypeOrmModule.forFeature([Customer])],
	exports: [TypeOrmModule, CustomerService],
})
export class CustomerModule {}
