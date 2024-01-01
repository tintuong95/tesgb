import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsDate,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import * as TYPE from '@entities/Types/core';
export class CreatePaymentDto {
	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	accountId: string;

	// @IsString()
	// @ApiProperty()
	// @Expose()
	// orderId: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	amount: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	description: string;

	@IsEnum(TYPE.PAYMENT_OPTION)
	@ApiProperty()
	@Expose()
	option: TYPE.PAYMENT_OPTION;

	@IsEnum(TYPE.ACCOUNT_TYPE)
	@ApiProperty()
	@Expose()
	type: TYPE.ACCOUNT_TYPE;

	@IsDate()
	@ApiProperty()
	@Expose()
	expiredAt: Date;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}

export class CreatePaymentOptionDto {
	@IsEnum(TYPE.PAYMENT_OPTION)
	@ApiProperty()
	@Expose()
	option: TYPE.PAYMENT_OPTION;

	@IsEnum(TYPE.ACCOUNT_TYPE)
	@ApiProperty()
	@Expose()
	type: TYPE.ACCOUNT_TYPE;
}
