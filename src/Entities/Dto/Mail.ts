import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsDate,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateMailDto {
	@IsEmail()
	@Expose()
	@MaxLength(50)
	to: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	from: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	subject: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(5000)
	html: string;
}
