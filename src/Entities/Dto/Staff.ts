import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional, IsString, MaxLength} from 'class-validator';

export class CreateStaffDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	firstName: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	lastName: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(20)
	position: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	address: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	phone: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	email: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	salary: number;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	workSchedule: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
