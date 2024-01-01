import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreatedServiceOrderDto {
	@IsString()
	@ApiProperty()
	@Expose()
	orderId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	serviceId: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	quanlity: number;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdatedServiceOrderDto extends PartialType(
	CreatedServiceOrderDto
) {}
