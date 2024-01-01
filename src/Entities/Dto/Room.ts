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
export class CreateRoomDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	name: string;

	@IsString()
	@ApiProperty()
	@Expose()
	floorId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	roomTypeId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	note: string;

	@IsEnum(TYPE.RoomStatus)
	@ApiProperty()
	@Expose()
	status: TYPE.RoomStatus;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
