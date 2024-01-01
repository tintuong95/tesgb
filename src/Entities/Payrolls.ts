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
	JoinColumn,
	OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {ApiProperty} from '@nestjs/swagger';
import {Stock} from './Stock';
import {
	ACCOUNT_RELATION,
	EMPLOYEE_RELATION,
	PAYROLL_RELATION,
	REVENUE_RELATION,
	STOCK_RELATION,
} from '@contants/relation';
import {Employee} from './Employees';
import {Revenue} from './Revenue';
import * as TYPE from './Types/core';
import {Account} from './Account';
@Entity({name: 'Payrolls'})
export class Payroll extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	employeeId: string;

	@Column({
		type: 'enum',
		enum: TYPE.PAYROLL_TYPE,
		default: TYPE.PAYROLL_TYPE.Salary,
	})
	@ApiProperty()
	type: TYPE.PAYROLL_TYPE;

	@Column({nullable: false})
	@ApiProperty()
	amount: number;

	@Column({nullable: true})
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

	@ManyToOne(() => Employee, (Employee) => Employee[PAYROLL_RELATION])
	[EMPLOYEE_RELATION]: Employee;

	@ManyToOne(() => Account, (Account) => Account[PAYROLL_RELATION])
	[ACCOUNT_RELATION]: Account;

	// @OneToOne(() => Revenue, (Revenue) => Revenue[PAYROLL_RELATION])
	// [REVENUE_RELATION]: Revenue;
}
