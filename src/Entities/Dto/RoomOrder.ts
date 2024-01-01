import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreatedRoomOrderDto {
	@IsString()
	@ApiProperty()
	@Expose()
	orderId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	roomId: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdatedRoomOrderDto extends PartialType(CreatedRoomOrderDto) {}
