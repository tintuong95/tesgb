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
	OneToOne,
	OneToMany,
	BeforeInsert,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Account} from './Account';
import {
	ACCOUNT_RELATION,
	PRODUCT_RELATION,
	STOCK_HISTORY_RELATION,
	STOCK_RELATION,
} from '@contants/relation';
import {Product} from './Product';
import {StockHistory} from './StockHistory';

@Entity({name: 'Stocks'})
export class Stock extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	productId: string;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	inventory: number;

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

	@OneToMany(() => StockHistory, (StockHistory) => StockHistory[STOCK_RELATION])
	[STOCK_HISTORY_RELATION]: StockHistory[];

	@OneToOne(() => Product, (product) => product[STOCK_RELATION]) // specify inverse side as a second parameter
	@JoinColumn()
	[PRODUCT_RELATION]: Product;

	@ManyToOne(() => Account, (Account) => Account[STOCK_RELATION])
	[ACCOUNT_RELATION]: Account;
}
