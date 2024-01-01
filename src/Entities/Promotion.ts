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
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Account} from './Account';
import {ACCOUNT_RELATION, PROMOTION_RELATION} from '@contants/relation';

@Entity({name: 'Promotions'})
export class Promotion extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false, length: 100})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	promotionType: number;

	@Column({nullable: false})
	@ApiProperty()
	price: number;

	@Column({nullable: false, length: 100})
	@ApiProperty()
	startDate: string;

	@Column({nullable: false, length: 100})
	@ApiProperty()
	endDate: string;

	@Column({nullable: false, length: 100})
	@ApiProperty()
	condition: string;

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

	// @ManyToOne(() => BlogGroup, {cascade: true})
	// @JoinColumn({name: 'groupId', referencedColumnName: 'id'})
	// [BLOG_GROUP_RELATION]: BlogGroup;

	// @OneToMany(
	// 	() => BlogTagRelation,
	// 	(blogTagRelation) => blogTagRelation[BLOG_RELATION]
	// )
	// [BLOG_TAG_RE_RELATION]: BlogTagRelation[];

	// @ManyToOne(() => Account, {cascade: true})
	// @JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
	// [ACCOUNT_RELATION]: Account;

	@ManyToOne(() => Account, (Account) => Account[PROMOTION_RELATION])
	[ACCOUNT_RELATION]: Account;
}
