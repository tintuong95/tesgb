import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreatePromotionDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(100)
	name: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	promotionType: number;

	@IsNumber()
	@ApiProperty()
	@Expose()
	price: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(100)
	startDate: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(100)
	endDate: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(100)
	condition: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}
