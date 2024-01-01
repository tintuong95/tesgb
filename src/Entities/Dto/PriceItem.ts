import * as TYPE from '@entities/Types/core';
import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreatePriceItemDto {
	@IsString()
	@ApiProperty()
	@Expose()
	accountId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	priceId: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	priceRoom: number;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	checkOutAt: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	checkInAt: string;

	@IsOptional()
	@IsEnum(TYPE.PriceItemType)
	@ApiProperty()
	@Expose()
	type: TYPE.PriceItemType;
}

export class UpdatePriceItemDto extends PartialType(CreatePriceItemDto) {}
