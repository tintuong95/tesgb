import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	Put,
	Delete,
	Req,
	UseGuards,
	HttpException,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import {
	CustomerOrderService,
	CustomerService,
	OrderService,
	OtherOrderService,
	RevenueService,
	RoomOrderService,
	RoomService,
	ServiceOrderService,
} from '../services/core';
import {
	CreateCustomerDto,
	CreateOrderDto,
	CreateRevenueDto,
	CreatedCustomerOrderDto,
	CreatedOtherOrderDto,
	CreatedRoomOrderDto,
	CreatedServiceOrderDto,
	UpdateOrderDto,
} from '../Entities/Dto/core';
import {Order} from '../Entities/Order';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import * as _ from 'lodash';
import {IOrderController} from './Interfaces/IOrderController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {OrderStatus} from '@entities/Types/Order';
import * as TYPE from '../Entities/Types/core';
import {RoomOrder} from '@entities/RoomOrder';

@Controller('order')
@ApiTags('order')
@UseGuards(JwtAuthGuard)
export class OrderController implements IOrderController {
	constructor(
		private orderService: OrderService,
		private customerService: CustomerService,
		private roomOrderService: RoomOrderService,
		private customerOrderService: CustomerOrderService,
		private seriveOrderService: ServiceOrderService,
		private roomService: RoomService,
		private revenueService: RevenueService,
		private otherOrderService: OtherOrderService
	) {}
	@Get('list')
	async getAllOrders(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Order[]> {
		return await this.orderService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getOrderDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Order> {
		return await this.orderService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createOrder(
		@Body() createOrderDto: any,
		@User() user: UserDto
	): Promise<Order | any> {
		const createOrder: CreateOrderDto = new CreateOrderDto();
		createOrder.accountId = user.accountId;
		createOrder.status = createOrderDto.status;
		createOrder.checkInDate = createOrderDto.checkInDate;
		createOrder.checkOutDate = createOrderDto.checkOutDate;

		if (createOrderDto.numDays) createOrder.numDays = createOrderDto.numDays;
		if (createOrderDto.numNights)
			createOrder.numNights = createOrderDto.numNights;
		if (createOrderDto.numMoreHours)
			createOrder.numMoreHours = createOrderDto.numMoreHours;
		if (createOrderDto.numHours) createOrder.numHours = createOrderDto.numHours;

		const order = await this.orderService.createAsync(createOrder, user);

		const idCards = _(createOrderDto?.customers)
			.map((item) => item?.idCard)
			.value();

		const findIdCardList = await this.customerService.findByIdCards(
			user,
			idCards
		);

		const newCustomerList = _.differenceWith(
			createOrderDto?.customers,
			findIdCardList,
			(obj1: any, obj2: any) => obj1?.idCard === obj2?.idCard
		);

		const customerListHandler = _(newCustomerList)
			.map((item) => ({
				...item,
				accountId: user.accountId,
			}))
			.value();
		const customerList = await this.customerService.createAsync(
			customerListHandler
		);

		const orderCustomerListHandler = _([...customerList, ...findIdCardList])
			.map((item) => ({
				orderId: order.id,
				customerId: item.id,
				accountId: user.accountId,
			}))
			.value();

		await this.customerOrderService.createAsync(orderCustomerListHandler, user);

		const roomList = _(createOrderDto?.rooms)
			.map((item) => item.id)
			.value();

		const result = await this.roomService.updateStatusAsync(
			roomList,
			changeState(createOrderDto?.status)
		);

		const roomOrderListHandler = _(createOrderDto?.rooms)
			.map((item) => ({
				orderId: order.id,
				roomId: item.id,
				accountId: user.accountId,
			}))
			.value();

		await this.roomOrderService.createAsync(roomOrderListHandler);

		const serviceOrderListHandler = _(createOrderDto?.services)
			.map((item) => ({
				orderId: order.id,
				serviceId: item.id,
				quanlity: item.quanlity,
				accountId: user.accountId,
			}))
			.value();
		await this.seriveOrderService.createAsync(serviceOrderListHandler);

		const otherOrderListHandler = _(createOrderDto?.others)
			.map((item) => ({
				...item,
				orderId: order.id,
				accountId: user.accountId,
			}))
			.value();
		await this.otherOrderService.createAsync(otherOrderListHandler);
		return order;
	}

	@Post('create-update-order')
	async createUpdateOrder(
		@Body() createUpdateOrderDto: any,
		@User() user: UserDto
	) {
		try {
			if (createUpdateOrderDto?.orderId) {
				if (createUpdateOrderDto?.room) {
					const newRoomOrder = new CreatedRoomOrderDto();

					newRoomOrder.roomId = createUpdateOrderDto.room.id;
					newRoomOrder.accountId = user.accountId;
					newRoomOrder.orderId = createUpdateOrderDto.orderId;
					return this.roomOrderService.createAsync([newRoomOrder]);
				} else if (
					createUpdateOrderDto?.customer &&
					createUpdateOrderDto.orderId
				) {
					const findIdCardList = await this.customerService.findByIdCards(
						user,
						[createUpdateOrderDto?.customer?.idCard]
					);

					if (findIdCardList.length > 0) {
						const newCustomerOrder = new CreatedCustomerOrderDto();
						newCustomerOrder.accountId = user.accountId;
						newCustomerOrder.customerId = findIdCardList[0]?.id;
						newCustomerOrder.orderId = createUpdateOrderDto.orderId;
						this.customerOrderService.createAsync([newCustomerOrder], user);
					} else {
						const newCustomer = new CreateCustomerDto();
						newCustomer.accountId = user.accountId;
						newCustomer.address = createUpdateOrderDto.customer.address;
						newCustomer.birthday = createUpdateOrderDto.customer.birthday;
						newCustomer.email = createUpdateOrderDto.customer.email;
						newCustomer.firstName = createUpdateOrderDto.customer.firstName;
						newCustomer.lastName = createUpdateOrderDto.customer.lastName;
						newCustomer.idCard = createUpdateOrderDto.customer.idCard;
						newCustomer.note = createUpdateOrderDto.customer.note;
						newCustomer.phone = createUpdateOrderDto.customer.phone;
						const customer = await this.customerService.createAsync([
							newCustomer,
						]);

						const newCustomerOrder = new CreatedCustomerOrderDto();
						newCustomerOrder.accountId = user.accountId;
						newCustomerOrder.customerId = customer[0].id;
						newCustomerOrder.orderId = createUpdateOrderDto.orderId;
						return this.customerOrderService.createAsync(
							newCustomerOrder,
							user
						);
					}
				} else if (
					createUpdateOrderDto?.service &&
					createUpdateOrderDto.orderId
				) {
					const newServiceOrder = new CreatedServiceOrderDto();
					newServiceOrder.quanlity = createUpdateOrderDto.service.quanlity;
					newServiceOrder.serviceId = createUpdateOrderDto.service.serviceId;
					newServiceOrder.accountId = user.accountId;
					newServiceOrder.orderId = createUpdateOrderDto.orderId;
					return this.seriveOrderService.createAsync([newServiceOrder]);
				} else if (
					createUpdateOrderDto?.checkInDate ||
					createUpdateOrderDto?.checkOutDate
				) {
					const newUpdate = new UpdateOrderDto();
					if (createUpdateOrderDto?.checkInDate)
						newUpdate.checkInDate = createUpdateOrderDto?.checkInDate;
					if (createUpdateOrderDto?.checkOutDate)
						newUpdate.checkOutDate = createUpdateOrderDto?.checkOutDate;

					return this.orderService.updateAsync(
						createUpdateOrderDto.orderId,
						newUpdate,
						user
					);
				} else if (
					createUpdateOrderDto?.numDays ||
					createUpdateOrderDto?.numNights ||
					createUpdateOrderDto?.numHours ||
					createUpdateOrderDto?.numMoreHours ||
					createUpdateOrderDto?.numDays == 0 ||
					createUpdateOrderDto?.numNights == 0 ||
					createUpdateOrderDto?.numHours == 0 ||
					createUpdateOrderDto?.numMoreHours == 0
				) {
					const newUpdate = new UpdateOrderDto();
					if (
						createUpdateOrderDto?.numDays ||
						createUpdateOrderDto?.numDays == 0
					)
						newUpdate.numDays = createUpdateOrderDto?.numDays;
					if (
						createUpdateOrderDto?.numNights ||
						createUpdateOrderDto?.numNights == 0
					)
						newUpdate.numNights = createUpdateOrderDto?.numNights;
					if (
						createUpdateOrderDto?.numHours ||
						createUpdateOrderDto?.numHours == 0
					)
						newUpdate.numHours = createUpdateOrderDto?.numHours;
					if (
						createUpdateOrderDto?.numMoreHours ||
						createUpdateOrderDto?.numMoreHours == 0
					)
						newUpdate.numMoreHours = createUpdateOrderDto?.numMoreHours;

					return this.orderService.updateAsync(
						createUpdateOrderDto.orderId,
						newUpdate,
						user
					);
				} else if (createUpdateOrderDto?.other) {
					const newOtherOrder = new CreatedOtherOrderDto();

					newOtherOrder.accountId = user.accountId;
					newOtherOrder.orderId = createUpdateOrderDto.orderId;
					return this.otherOrderService.createAsync([newOtherOrder]);
				}
			} else {
				throw new NotFoundException('Order Not Found !');
			}
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Put(':id/update')
	async updateOrder(
		@Body(ValidationPipe)
		updateOrderDto: UpdateOrderDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Order> {
		return await this.orderService.updateAsync(id, updateOrderDto, user);
	}

	@Put(':id/status')
	async changeStatusOrder(
		@Body(ValidationPipe)
		status: {status: OrderStatus},
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Order> {
		const order = await this.orderService.findOneAsync(id, user);
		if (order) {
			const rooms = _(order?.roomOrder)
				.map((item) => item?.roomId)
				.value();
			await this.roomService.updateStatusAsync(
				rooms,
				changeState(status.status)
			);
		}
		const update = new UpdateOrderDto();
		update.status = status.status;
		const result = await this.orderService.updateAsync(id, update, user);
		if (status.status == TYPE.OrderStatus.Completed) {
			const newRevenue = new CreateRevenueDto();
			newRevenue.accountId = user.accountId;
			newRevenue.memberId = user.id;
			newRevenue.referenceId = order.id;
			newRevenue.referenceType = TYPE.REVENUE_TYPE.ORDER;
			newRevenue.type = TYPE.REVENUE_STATE.REVENUE;
			newRevenue.amount = await this.orderService.sumTotalMoneyOfOrder(
				id,
				user
			);
			this.revenueService.createAsync(newRevenue, user);
		}
		return result;
	}

	@Delete(':id/remove')
	async removeOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.orderService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.orderService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.orderService.deleteAsync(id, user);
	}

	@Get('/count-rooms-status')
	async countRoomsStatus(
		@User() user: UserDto,
		@Req() request: Request
	): Promise<string> {
		return await this.orderService.countRoomStatusByTime(user, request);
	}

	@Get('/count-order-status-current')
	async countRoomsStatusCurrent(
		@User() user: UserDto,
		@Req() request: Request
	): Promise<string> {
		return await this.orderService.countRoomStatusCurrent(user, request);
	}
}

function changeState(status) {
	if (status == OrderStatus.Unconfirmed) return TYPE.RoomStatus.Unconfirmed;
	else if (status == OrderStatus.Confirmed) return TYPE.RoomStatus.Payment;
	else if (status == OrderStatus.Completed) return TYPE.RoomStatus.Ready;
}
