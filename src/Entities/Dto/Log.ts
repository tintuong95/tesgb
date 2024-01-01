import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateLogDto {
	@IsNumber()
	@ApiProperty()
	@Expose()
	logType: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	content: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateLogDto extends PartialType(CreateLogDto) {}
