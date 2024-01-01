import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Stock} from '../entities/core';
import {StockController} from '../Controllers/core';
import {ProductService, StockService} from '../services/core';
import {ProductModule} from './ProductModule';
import {MemberModule} from './MemberModule';

@Module({
	controllers: [StockController],
	providers: [StockService],
	imports: [TypeOrmModule.forFeature([Stock]), ProductModule],
	exports: [TypeOrmModule, StockService],
})
export class StockModule {}
