import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import * as TYPE from '../Types/core';
export class CreateRevenueDto {
	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	referenceId: string;

	@IsEnum(TYPE.REVENUE_TYPE)
	@ApiProperty()
	@Expose()
	referenceType: TYPE.REVENUE_TYPE;

	@IsString()
	@ApiProperty()
	@IsOptional()
	@Expose()
	accountId: string;

	@IsString()
	@ApiProperty()
	@IsOptional()
	@Expose()
	memberId: string;

	@IsEnum(TYPE.REVENUE_STATE)
	@ApiProperty()
	@Expose()
	type: TYPE.REVENUE_STATE;

	@IsString()
	@ApiProperty()
	@IsOptional()
	@Expose()
	note: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	amount: number;
}

export class UpdateRevenueDto extends PartialType(CreateRevenueDto) {}
