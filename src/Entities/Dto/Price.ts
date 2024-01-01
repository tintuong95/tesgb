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

export class CreatePriceDto {
	@IsString()
	@ApiProperty()
	@Expose()
	name: string;

	@IsOptional()
	@IsEnum(TYPE.PriceStatus)
	@ApiProperty()
	@Expose()
	status: TYPE.PriceStatus;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}

export class CreatePriceAllDto {
	@IsString()
	@ApiProperty()
	@Expose()
	name: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	priceHour: number;

	@IsNumber()
	@ApiProperty()
	@Expose()
	priceMore: number;

	@IsNumber()
	@ApiProperty()
	@Expose()
	priceNight: number;

	@IsNumber()
	@ApiProperty()
	@Expose()
	priceDay: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	checkInNight: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	checkOutNight: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	checkInDay: string;

	@IsString()
	@ApiProperty()
	@IsOptional()
	@Expose()
	checkOutDay: string;

	@IsOptional()
	@IsEnum(TYPE.PriceStatus)
	@ApiProperty()
	@Expose()
	status: TYPE.PriceStatus;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}
export class UpdatePriceAllDto extends PartialType(CreatePriceAllDto) {}
