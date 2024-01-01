import {PartialType} from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	name: string;

	@IsNumber()
	@ApiProperty()
	@IsOptional()
	@Expose()
	barcode: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	unitId: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
