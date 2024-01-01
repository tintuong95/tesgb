import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateReportDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	reportType: string;

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

export class UpdateReportDto extends PartialType(CreateReportDto) {}
