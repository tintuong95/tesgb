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
import * as TYPE from '../Types/core';
export class CreateServiceDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	name: string;

	@IsString()
	@ApiProperty()
	@Expose()
	serviceTypeId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	unitId: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	price: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	@Expose()
	inventory: number;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;

	@IsOptional()
	@IsEnum(TYPE.ServiceStatus)
	@ApiProperty()
	@Expose()
	status: TYPE.ServiceStatus;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
