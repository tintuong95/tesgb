import {
	Entity,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	OneToMany,
	BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {ApiProperty} from '@nestjs/swagger';
import {Stock} from './Stock';
import {
	ACCOUNT_RELATION,
	CUSTOMER_ORDER_RELATION,
	CUSTOMER_RELATION,
	EMPLOYEE_PAYROLL_RELATION,
	EMPLOYEE_RELATION,
	FEED_BACK_RELATION,
	FLOOR_RELATION,
	LOG_RELATION,
	MEMBER_RELATION,
	ORDER_RELATION,
	OTHER_ORDER_RELATION,
	PAYMENT_RELATION,
	PAYROLL_RELATION,
	PRICE_ITEM_RELATION,
	PRICE_RELATION,
	PRODUCT_RELATION,
	PROMOTION_RELATION,
	REPORT_RELATION,
	REVENUE_RELATION,
	ROLE_RELATION,
	ROOM_ORDER_RELATION,
	ROOM_RELATION,
	ROOM_TYPE_RELATION,
	SERVICE_ORDER_RELATION,
	SERVICE_RELATION,
	SERVICE_TYPE_RELATION,
	STAFF_RELATION,
	STOCK_HISTORY_RELATION,
	STOCK_RELATION,
	UNIT_RELATION,
} from '@contants/relation';
import {Customer} from './Customer';
import {CustomerOrder} from './CustomerOrder';
import {Employee} from './Employees';
import {Feedback} from './Feedback';
import {Floor} from './Floor';
import {Log} from './Log';
import {Member} from './Member';
import {Order} from './Order';
import {Payment} from './Payment';
import {Payroll} from './Payrolls';
import {Price} from './Price';
import {Product} from './Product';
import {Promotion} from './Promotion';
import {Report} from './Report';
import {Role} from './Role';
import {Room} from './Room';
import {RoomOrder} from './RoomOrder';
import {RoomType} from './RoomType';
import {Service} from './Service';
import {ServiceOrder} from './ServiceOrder';
import {ServiceType} from './ServiceType';
import {Staff} from './Staff';
import {StockHistory} from './StockHistory';
import {Revenue} from './Revenue';
import {PriceItem} from './PriceItem';
import {Unit} from './Unit';
import * as TYPE from './Types/core';
import {OtherOrder} from './OtherOrder';
@Entity({name: 'Accounts'})
export class Account extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	email: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	nameHotel: string;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	address: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	phone: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	codeBank: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	nameBank: string;

	@Column({nullable: true})
	@ApiProperty()
	accountBank: number;

	@Column({nullable: true})
	@ApiProperty()
	expiredAt: Date;

	@Column({
		type: 'enum',
		enum: TYPE.ACCOUNT_TYPE,
		default: TYPE.ACCOUNT_TYPE.Basic,
	})
	@ApiProperty()
	type: TYPE.ACCOUNT_TYPE;

	@Column({
		type: 'enum',
		enum: TYPE.ACCOUNT_STATUS,
		default: TYPE.ACCOUNT_STATUS.Unconfirmed,
	})
	@ApiProperty()
	status: TYPE.ACCOUNT_STATUS;

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

	@OneToMany(() => Customer, (Customer) => Customer[ACCOUNT_RELATION])
	[CUSTOMER_RELATION]: Customer[];

	@OneToMany(
		() => CustomerOrder,
		(CustomerOrder) => CustomerOrder[ACCOUNT_RELATION]
	)
	[CUSTOMER_ORDER_RELATION]: CustomerOrder[];

	@OneToMany(() => Employee, (Employee) => Employee[ACCOUNT_RELATION])
	[EMPLOYEE_RELATION]: Employee[];

	@OneToMany(() => Feedback, (Feedback) => Feedback[ACCOUNT_RELATION])
	[FEED_BACK_RELATION]: Feedback[];

	@OneToMany(() => Floor, (Floor) => Floor[ACCOUNT_RELATION])
	[FLOOR_RELATION]: Floor[];

	@OneToMany(() => Log, (Log) => Log[ACCOUNT_RELATION])
	[LOG_RELATION]: Log[];

	@OneToMany(() => Member, (Member) => Member[ACCOUNT_RELATION])
	[MEMBER_RELATION]: Member[];
	@OneToMany(() => Order, (Order) => Order[ACCOUNT_RELATION])
	[ORDER_RELATION]: Order[];
	@OneToMany(() => Payment, (Payment) => Payment[ACCOUNT_RELATION])
	[PAYMENT_RELATION]: Payment[];
	@OneToMany(() => Payroll, (Payroll) => Payroll[ACCOUNT_RELATION])
	[PAYROLL_RELATION]: Payroll[];
	@OneToMany(() => Price, (Price) => Price[ACCOUNT_RELATION])
	[PRICE_RELATION]: Price[];
	@OneToMany(() => Product, (Product) => Product[ACCOUNT_RELATION])
	[PRODUCT_RELATION]: Product[];
	@OneToMany(() => Promotion, (Promotion) => Promotion[ACCOUNT_RELATION])
	[PROMOTION_RELATION]: Promotion[];
	@OneToMany(() => Report, (Report) => Report[ACCOUNT_RELATION])
	[REPORT_RELATION]: Report[];
	@OneToMany(() => Role, (Role) => Role[ACCOUNT_RELATION])
	[ROLE_RELATION]: Role[];
	@OneToMany(() => Room, (Room) => Room[ACCOUNT_RELATION])
	[ROOM_RELATION]: Room[];
	@OneToMany(() => RoomOrder, (RoomOrder) => RoomOrder[ACCOUNT_RELATION])
	[ROOM_ORDER_RELATION]: RoomOrder[];
	@OneToMany(() => RoomType, (RoomType) => RoomType[ACCOUNT_RELATION])
	[ROOM_TYPE_RELATION]: RoomType[];
	@OneToMany(() => Service, (Service) => Service[ACCOUNT_RELATION])
	[SERVICE_RELATION]: Service[];
	@OneToMany(
		() => ServiceOrder,
		(ServiceOrder) => ServiceOrder[ACCOUNT_RELATION]
	)
	[SERVICE_ORDER_RELATION]: ServiceOrder[];
	@OneToMany(() => ServiceType, (ServiceType) => ServiceType[ACCOUNT_RELATION])
	[SERVICE_TYPE_RELATION]: ServiceType[];
	@OneToMany(() => Staff, (Staff) => Staff[ACCOUNT_RELATION])
	[STAFF_RELATION]: Staff[];
	@OneToMany(() => Stock, (Stock) => Stock[ACCOUNT_RELATION])
	[STOCK_RELATION]: Stock[];
	@OneToMany(
		() => StockHistory,
		(StockHistory) => StockHistory[ACCOUNT_RELATION]
	)
	[STOCK_HISTORY_RELATION]: StockHistory[];

	@OneToMany(() => Revenue, (Revenue) => Revenue[ACCOUNT_RELATION])
	[REVENUE_RELATION]: Revenue[];

	@OneToMany(() => PriceItem, (PriceItem) => PriceItem[ACCOUNT_RELATION])
	[PRICE_ITEM_RELATION]: PriceItem[];

	@OneToMany(() => OtherOrder, (OtherOrder) => OtherOrder[ACCOUNT_RELATION])
	[OTHER_ORDER_RELATION]: OtherOrder[];

	// @OneToMany(() => Unit, (Unit) => Unit[ACCOUNT_RELATION])
	// [UNIT_RELATION]: Unit[];
}
