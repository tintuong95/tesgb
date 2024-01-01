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
export class CreateRoomTypeDto {
	@IsString()
	@ApiProperty()
	@Expose()
	priceId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	name: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	quality: number;

	@IsNumber()
	@ApiProperty()
	@Expose()
	bed: number;

	@IsString()
	@IsOptional()
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

	@IsEnum(TYPE.BedType)
	@ApiProperty()
	@Expose()
	bedType: TYPE.BedType;
}

export class UpdateRoomTypeDto extends PartialType(CreateRoomTypeDto) {}
