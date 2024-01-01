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
import * as TYPE from '@entities/Types/core';
export class CreateCustomerDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	firstName: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	lastName: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	address: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	phone: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	email: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	birthday: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	idCard: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	note: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;

	@IsOptional()
	@IsEnum(TYPE.GENDER)
	@ApiProperty()
	@Expose()
	gender: TYPE.GENDER;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
