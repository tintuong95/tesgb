import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsEnum,
	IsNumber,
	IsString,
	IsOptional,
	MaxLength,
} from 'class-validator';
import * as TYPE from '../Types/core';
export class CreateStockHistoryDto {
	@IsString()
	@ApiProperty()
	@Expose()
	stockId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	memberId: string;

	@IsEnum(TYPE.StockHistoryType)
	@ApiProperty()
	@Expose()
	type: TYPE.StockHistoryType;

	@IsNumber()
	@ApiProperty()
	@Expose()
	quantity: number;

	@IsNumber()
	@ApiProperty()
	@IsOptional()
	@Expose()
	price: number;

	@IsString()
	@ApiProperty()
	@IsOptional()
	@Expose()
	supplier: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	note: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateStockHistoryDto extends PartialType(CreateStockHistoryDto) {}
