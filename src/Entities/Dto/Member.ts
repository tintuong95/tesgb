import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Exclude, Expose} from 'class-transformer';
import {
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
} from 'class-validator';
import {CreateAccountDto} from './Account';

export class CreateMemberDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	username: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	password: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}
export class UpdateMemberDto extends PartialType(CreateMemberDto) {}

export class SigninMemberDto {
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	username: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	password: string;
}
