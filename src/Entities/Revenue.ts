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
	OneToOne,
	JoinColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Service} from './Service';
import {
	ACCOUNT_RELATION,
	MEMBER_RELATION,
	ORDER_RELATION,
	PAYROLL_RELATION,
	REVENUE_RELATION,
	SERVICE_RELATION,
	SERVICE_TYPE_RELATION,
	STOCK_HISTORY_RELATION,
} from '@contants/relation';
import {Account} from './Account';
import {Order} from './Order';
import {Payroll} from './Payrolls';
import {StockHistory} from './StockHistory';
import {Member} from './Member';
import * as TYPE from './Types/core';
@Entity({name: 'Revenues'})
export class Revenue extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	referenceId: string;

	@Column({
		type: 'enum',
		enum: TYPE.REVENUE_TYPE,
		default: TYPE.REVENUE_TYPE.OTHER,
	})
	@ApiProperty()
	referenceType: TYPE.REVENUE_TYPE;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	memberId: string;

	@Column({nullable: false})
	@ApiProperty()
	amount: number;

	@Column({
		type: 'enum',
		enum: TYPE.REVENUE_STATE,
		default: TYPE.REVENUE_STATE.REVENUE,
	})
	@ApiProperty()
	type: TYPE.REVENUE_STATE;

	@Column({length: 500, nullable: true})
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

	// @OneToOne(() => Order, (Order) => Order[REVENUE_RELATION])
	// // @JoinColumn({name: 'referenceId'})
	// [ORDER_RELATION]: Order;

	// @OneToOne(() => Payroll, (Payroll) => Payroll[REVENUE_RELATION])
	// // @JoinColumn({name: 'referenceId'})
	// [PAYROLL_RELATION]: Payroll;

	// @OneToOne(
	// 	() => StockHistory,
	// 	(StockHistory) => StockHistory[REVENUE_RELATION]
	// )
	// // @JoinColumn({name: 'referenceId'})
	// [STOCK_HISTORY_RELATION]: StockHistory;

	@ManyToOne(() => Account, (Account) => Account[REVENUE_RELATION])
	[ACCOUNT_RELATION]: Account;

	@ManyToOne(() => Member, (Member) => Member[REVENUE_RELATION])
	[MEMBER_RELATION]: Member;
}
