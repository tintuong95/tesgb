import * as TYPE from '@entities/Types/core';
import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsDate,
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateOrderDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	code: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;

	@IsEnum(TYPE.OrderStatus)
	@ApiProperty()
	@Expose()
	status: TYPE.OrderStatus;

	@IsDate()
	@ApiProperty()
	@Expose()
	checkInDate: Date;

	@IsDate()
	@ApiProperty()
	@Expose()
	checkOutDate: Date;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	@Expose()
	numDays: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	@Expose()
	numNights: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	@Expose()
	numHours: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	@Expose()
	numMoreHours: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
