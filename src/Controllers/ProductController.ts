import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	Put,
	Delete,
	Req,
	UseGuards,
} from '@nestjs/common';
import {ProductService} from '../services/core';
import {CreateProductDto, UpdateProductDto} from '../Entities/Dto/core';
import {Product} from '../entities/Product';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IProductController} from './Interfaces/IProductController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('product')
@UseGuards(JwtAuthGuard)
@ApiTags('product')
export class ProductController implements IProductController {
	constructor(private productService: ProductService) {}
	@Get('list')
	async getAllProducts(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Product[]> {
		return await this.productService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getProductDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Product> {
		return await this.productService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createProduct(
		@Body() createProductDto: CreateProductDto,
		@User() user: UserDto
	): Promise<Product> {
		return await this.productService.createAsync(createProductDto, user);
	}

	@Put(':id/update')
	async updateProduct(
		@Body(ValidationPipe)
		updateProductDto: UpdateProductDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Product> {
		return await this.productService.updateAsync(id, updateProductDto, user);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeProduct(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.productService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreProduct(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.productService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteProduct(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.productService.deleteAsync(id, user);
	}

	@Get('/count-product')
	async countEmployeeByStatus(
		@User() user: UserDto,
		@Req() request: Request
	): Promise<string> {
		return await this.productService.countProductStatusCurrent(user, request);
	}
}
