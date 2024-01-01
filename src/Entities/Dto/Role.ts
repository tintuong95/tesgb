import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber} from 'class-validator';

export class CreateRoleDto {
	@IsNumber()
	@ApiProperty()
	@Expose()
	memberId: string;

	@IsNumber()
	@ApiProperty()
	@Expose()
	role: number;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
