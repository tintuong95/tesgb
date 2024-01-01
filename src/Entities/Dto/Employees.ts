import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import * as TYPE from '@entities/Types/core';
export class CreateEmployeeDto {
	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	firstName: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	lastName: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	idCard: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	phone: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	email: string;

	@IsEnum(TYPE.GENDER_TYPE)
	@ApiProperty()
	@Expose()
	gender: TYPE.GENDER_TYPE;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	address: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	salary: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	position: string;

	@IsString()
	@ApiProperty()
	@Expose()
	hireDate: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
