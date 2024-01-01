import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateAccountDto {
	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	email: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	nameHotel: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	address: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	phone: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	codeBank: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(50)
	nameBank: string;

	@IsOptional()
	@IsNumber()
	@ApiProperty()
	@Expose()
	accountBank: number;

	@IsOptional()
	@IsDate()
	@ApiProperty()
	@Expose()
	expiredAt: Date;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
