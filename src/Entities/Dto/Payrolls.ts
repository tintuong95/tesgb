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
export class CreatePayrollDto {
	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	accountId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	employeeId: string;

	@IsEnum(TYPE.PAYROLL_TYPE)
	@ApiProperty()
	@Expose()
	type: TYPE.PAYROLL_TYPE;

	@IsNumber()
	@ApiProperty()
	@Expose()
	amount: number;

	@IsString()
	@ApiProperty()
	@Expose()
	note: string;
}

export class UpdatePayrollDto extends PartialType(CreatePayrollDto) {}
