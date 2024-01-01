import {
	Entity,
	BeforeInsert,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {ApiProperty} from '@nestjs/swagger';
import {Stock} from './Stock';
import {
	ACCOUNT_RELATION,
	EMPLOYEE_RELATION,
	PAYROLL_RELATION,
	STOCK_RELATION,
} from '@contants/relation';
import {Payroll} from './Payrolls';
import {Account} from './Account';
import * as TYPE from './Types/core';
@Entity({name: 'Employees'})
export class Employee extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	firstName: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	lastName: string;

	@Column({length: 50})
	@ApiProperty()
	idCard: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	phone: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	email: string;

	@Column({
		type: 'enum',
		enum: TYPE.GENDER_TYPE,
		default: TYPE.GENDER_TYPE.Male,
	})
	@ApiProperty()
	gender: TYPE.GENDER_TYPE;

	@Column({
		type: 'enum',
		enum: TYPE.EMPLOYEE_STATUS,
		default: TYPE.EMPLOYEE_STATUS.Actived,
	})
	@ApiProperty()
	status: TYPE.EMPLOYEE_STATUS;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	address: string;

	@Column({nullable: false})
	@ApiProperty()
	salary: number;

	@Column({length: 50})
	@ApiProperty()
	position: string;

	@Column({nullable: false})
	@ApiProperty()
	hireDate: string;

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

	@OneToMany(() => Payroll, (payroll) => payroll[EMPLOYEE_RELATION])
	[PAYROLL_RELATION]: Payroll[];

	@ManyToOne(() => Account, (Account) => Account[EMPLOYEE_RELATION])
	[ACCOUNT_RELATION]: Account;
}
