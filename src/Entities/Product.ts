import {
	Entity,
	BeforeInsert,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	OneToOne,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Stock} from './Stock';
import {
	ACCOUNT_RELATION,
	PRODUCT_RELATION,
	STOCK_RELATION,
	UNIT_RELATION,
} from '@contants/relation';
import {Account} from './Account';
import {Unit} from './Unit';
import {getRandomBetween, zeroPad} from '@util/generate';

@Entity({name: 'products'})
export class Product extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({type: 'bigint'})
	@ApiProperty()
	barcode: number;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	unitId: string;

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

	@BeforeInsert()
	generateBarcode() {
		if (this.barcode) {
			this.barcode = this.barcode;
		} else {
			this.barcode = +zeroPad(getRandomBetween(0, 999999999999), 12);
		}
	}

	@OneToOne(() => Stock, (stock) => stock[PRODUCT_RELATION]) // specify inverse side as a second parameter
	[STOCK_RELATION]: Stock;

	@ManyToOne(() => Unit, (Unit) => Unit[PRODUCT_RELATION]) // specify inverse side as a second parameter
	[UNIT_RELATION]: Unit;

	@ManyToOne(() => Account, (Account) => Account[PRODUCT_RELATION])
	[ACCOUNT_RELATION]: Account;
}
