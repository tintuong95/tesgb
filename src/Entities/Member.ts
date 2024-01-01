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
import * as bcrypt from 'bcrypt';
import {ApiProperty} from '@nestjs/swagger';
import {Stock} from './Stock';
import {
	ACCOUNT_RELATION,
	MEMBER_RELATION,
	REVENUE_RELATION,
	STOCK_HISTORY_RELATION,
	STOCK_RELATION,
} from '@contants/relation';
import {StockHistory} from './StockHistory';
import {Account} from './Account';
import {Revenue} from './Revenue';

@Entity({name: 'Members'})
export class Member extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 200, nullable: false, unique: true})
	@ApiProperty()
	username: string;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	password: string;

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
	hashPassword() {
		this.password = bcrypt.hashSync(
			this.password,
			+process.env.SALTROUNDS || 10
		);
	}

	comparePassword(attempt: string): boolean {
		return bcrypt.compareSync(attempt, this.password);
	}

	@OneToMany(() => Stock, (stock) => stock[MEMBER_RELATION])
	[STOCK_RELATION]: Stock[];

	@OneToMany(
		() => StockHistory,
		(stockHistory) => stockHistory[MEMBER_RELATION]
	)
	[STOCK_HISTORY_RELATION]: StockHistory[];

	@ManyToOne(() => Account, (Account) => Account[MEMBER_RELATION])
	[ACCOUNT_RELATION]: Account;

	@OneToMany(() => Revenue, (Revenue) => Revenue[MEMBER_RELATION])
	[REVENUE_RELATION]: Revenue[];
}
