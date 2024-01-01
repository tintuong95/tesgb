import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {StockHistory} from '../entities/core';
import {StockHistoryController} from '../Controllers/core';
import {StockHistoryService} from '../services/core';
import {ProductModule} from './ProductModule';
import {StockModule} from './StockModule';
import {RevenueModule} from './RevenueModule';

@Module({
	controllers: [StockHistoryController],
	providers: [StockHistoryService],
	imports: [
		TypeOrmModule.forFeature([StockHistory]),
		ProductModule,
		StockModule,
		RevenueModule,
	],
	exports: [TypeOrmModule],
})
export class StockHistoryModule {}
