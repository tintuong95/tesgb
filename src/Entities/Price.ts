import {
	Entity,
	BeforeInsert,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	OneToMany,
	ManyToOne,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {RoomType} from './RoomType';
import {
	ACCOUNT_RELATION,
	PRICE_ITEM_RELATION,
	PRICE_RELATION,
	ROOM_TYPE_RELATION,
} from '@contants/relation';
import * as TYPE from './Types/core';
import {Account} from './Account';
import {PriceItem} from './PriceItem';
@Entity({name: 'Prices'})
export class Price extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	name: string;

	@Column({
		type: 'enum',
		enum: TYPE.PriceStatus,
		default: TYPE.PriceStatus.Ready,
	})
	@ApiProperty()
	status: TYPE.PriceStatus;

	@CreateDateColumn()
	@ApiProperty()
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty()
	deletedAt: Date;

	@BeforeInsert()
	generateId() {
		this.id = Math.random().toString(36).slice(2, 36);
	}

	@OneToMany(() => RoomType, (roomType) => roomType[PRICE_RELATION])
	[ROOM_TYPE_RELATION]: RoomType[];

	@OneToMany(() => PriceItem, (PriceItem) => PriceItem[PRICE_RELATION])
	[PRICE_ITEM_RELATION]: PriceItem[];

	@ManyToOne(() => Account, (Account) => Account[PRICE_RELATION])
	[ACCOUNT_RELATION]: Account;
}
