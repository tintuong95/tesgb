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

import * as TYPE from './Types/core';
import {Account} from './Account';
import {Price} from './Price';
import {
	ACCOUNT_RELATION,
	PRICE_ITEM_RELATION,
	PRICE_RELATION,
} from '@contants/relation';
@Entity({name: 'PriceItems'})
export class PriceItem extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	priceId: string;

	@Column({nullable: false})
	@ApiProperty()
	priceRoom: number;

	@Column({nullable: true})
	@ApiProperty()
	checkInAt: string;

	@Column({nullable: true})
	@ApiProperty()
	checkOutAt: string;

	@Column({
		type: 'enum',
		enum: TYPE.PriceItemType,
		default: TYPE.PriceItemType.HourPrice,
	})
	@ApiProperty()
	type: TYPE.PriceItemType;

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

	@ManyToOne(() => Account, (Account) => Account[PRICE_ITEM_RELATION])
	[ACCOUNT_RELATION]: Account;

	@ManyToOne(() => Price, (Price) => Price[PRICE_ITEM_RELATION])
	[PRICE_RELATION]: Price;
}
