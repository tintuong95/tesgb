import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Product} from '../entities/core';
import {ProductController} from '../Controllers/core';
import {ProductService} from '../services/core';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [TypeOrmModule.forFeature([Product])],
	exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
