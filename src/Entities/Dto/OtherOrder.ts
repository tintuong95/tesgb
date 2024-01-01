import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreatedOtherOrderDto {
	@IsString()
	@ApiProperty()
	@Expose()
	orderId: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	title: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	description: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	price: number;
}

export class UpdatedOtherOrderDto extends PartialType(CreatedOtherOrderDto) {}
