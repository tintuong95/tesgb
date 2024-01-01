import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateServiceTypeDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	name: string;

	@IsOptional()
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
}

export class UpdateServiceTypeDto extends PartialType(CreateServiceTypeDto) {}
