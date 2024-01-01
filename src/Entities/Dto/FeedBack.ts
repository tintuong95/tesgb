import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateFeedbackDto {
	@IsNumber()
	@ApiProperty()
	@Expose()
	customerId: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	rating: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(100)
	comment: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {}
