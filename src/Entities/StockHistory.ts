import {
	Entity,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	OneToOne,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import * as TYPE from './Types/core';
import {Stock} from './Stock';
import {
	ACCOUNT_RELATION,
	MEMBER_RELATION,
	REVENUE_RELATION,
	STOCK_HISTORY_RELATION,
	STOCK_RELATION,
} from '@contants/relation';
import {generateCode} from '@util/generate';
import {Member} from './Member';
import {Account} from './Account';
import {Revenue} from './Revenue';

@Entity({name: 'StockHistorys'})
export class StockHistory extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	stockId: string;

	@Column({nullable: false})
	@ApiProperty()
	memberId: string;

	@Column({
		type: 'enum',
		enum: TYPE.StockHistoryType,
		default: TYPE.StockHistoryType.Import,
	})
	@ApiProperty()
	type: TYPE.StockHistoryType;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	quantity: number;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	price: number;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	supplier: string;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	note: string;

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

	@ManyToOne(() => Stock, (Stock) => Stock[STOCK_HISTORY_RELATION])
	[STOCK_RELATION]: Stock;

	@ManyToOne(() => Member, (Member) => Member[STOCK_HISTORY_RELATION]) // specify inverse side as a second parameter
	[MEMBER_RELATION]: Member;

	@ManyToOne(() => Account, (Account) => Account[STOCK_HISTORY_RELATION])
	[ACCOUNT_RELATION]: Account;

	// @OneToOne(
	// 	() => StockHistory,
	// 	(StockHistory) => StockHistory[STOCK_HISTORY_RELATION]
	// )
	// [REVENUE_RELATION]: Revenue;
}
