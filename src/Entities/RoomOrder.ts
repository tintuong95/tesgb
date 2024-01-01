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
	JoinColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Order} from './Order';
import {
	ACCOUNT_RELATION,
	ORDER_RELATION,
	ROOM_ORDER_RELATION,
	ROOM_RELATION,
} from '@contants/relation';
import {Account} from './Account';
import {Room} from './Room';

@Entity({name: 'RoomOrders'})
export class RoomOrder extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	orderId: string;

	@Column({nullable: false})
	@ApiProperty()
	roomId: string;

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

	@ManyToOne(() => Order, (Order) => Order[ROOM_ORDER_RELATION])
	[ORDER_RELATION]: Order;

	@ManyToOne(() => Room, (Room) => Room[ROOM_ORDER_RELATION])
	[ROOM_RELATION]: Room;

	@ManyToOne(() => Account, (Account) => Account[ROOM_ORDER_RELATION])
	[ACCOUNT_RELATION]: Account;
}
