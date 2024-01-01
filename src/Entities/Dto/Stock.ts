import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateStockDto {
	@IsString()
	@ApiProperty()
	@Expose()
	productId: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;

	@IsOptional()
	@IsNumber()
	@ApiProperty()
	@Expose()
	invertory: number;
}

export class UpdateStockDto extends PartialType(CreateStockDto) {}
