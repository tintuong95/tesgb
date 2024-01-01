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
export class CreateUnitDto {
	constructor(name: string, type: TYPE.UnitType) {
		this.name = name;
		this.type = type;
	}
	@IsString()
	@ApiProperty()
	@Expose()
	name: string;

	@IsEnum(TYPE.UnitType)
	@ApiProperty()
	@Expose()
	type: TYPE.UnitType;

	// @IsOptional()
	// @IsString()
	// @ApiProperty()
	// @Expose()
	// @MaxLength(200)
	// accountId: string;
}

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}
