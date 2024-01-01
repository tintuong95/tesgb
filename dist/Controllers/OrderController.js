"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const _ = require("lodash");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const Order_1 = require("../entities/Types/Order");
const TYPE = require("../Entities/Types/core");
let OrderController = class OrderController {
    constructor(orderService, customerService, roomOrderService, customerOrderService, seriveOrderService, roomService, revenueService, otherOrderService) {
        this.orderService = orderService;
        this.customerService = customerService;
        this.roomOrderService = roomOrderService;
        this.customerOrderService = customerOrderService;
        this.seriveOrderService = seriveOrderService;
        this.roomService = roomService;
        this.revenueService = revenueService;
        this.otherOrderService = otherOrderService;
    }
    async getAllOrders(request, user) {
        return await this.orderService.findAllAsync(request, user);
    }
    async getOrderDetails(id, user) {
        return await this.orderService.findOneAsync(id, user);
    }
    async createOrder(createOrderDto, user) {
        const createOrder = new core_2.CreateOrderDto();
        createOrder.accountId = user.accountId;
        createOrder.status = createOrderDto.status;
        createOrder.checkInDate = createOrderDto.checkInDate;
        createOrder.checkOutDate = createOrderDto.checkOutDate;
        if (createOrderDto.numDays)
            createOrder.numDays = createOrderDto.numDays;
        if (createOrderDto.numNights)
            createOrder.numNights = createOrderDto.numNights;
        if (createOrderDto.numMoreHours)
            createOrder.numMoreHours = createOrderDto.numMoreHours;
        if (createOrderDto.numHours)
            createOrder.numHours = createOrderDto.numHours;
        const order = await this.orderService.createAsync(createOrder, user);
        const idCards = _(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.customers)
            .map((item) => item === null || item === void 0 ? void 0 : item.idCard)
            .value();
        const findIdCardList = await this.customerService.findByIdCards(user, idCards);
        const newCustomerList = _.differenceWith(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.customers, findIdCardList, (obj1, obj2) => (obj1 === null || obj1 === void 0 ? void 0 : obj1.idCard) === (obj2 === null || obj2 === void 0 ? void 0 : obj2.idCard));
        const customerListHandler = _(newCustomerList)
            .map((item) => (Object.assign(Object.assign({}, item), { accountId: user.accountId })))
            .value();
        const customerList = await this.customerService.createAsync(customerListHandler);
        const orderCustomerListHandler = _([...customerList, ...findIdCardList])
            .map((item) => ({
            orderId: order.id,
            customerId: item.id,
            accountId: user.accountId,
        }))
            .value();
        await this.customerOrderService.createAsync(orderCustomerListHandler, user);
        const roomList = _(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.rooms)
            .map((item) => item.id)
            .value();
        const result = await this.roomService.updateStatusAsync(roomList, changeState(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.status));
        const roomOrderListHandler = _(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.rooms)
            .map((item) => ({
            orderId: order.id,
            roomId: item.id,
            accountId: user.accountId,
        }))
            .value();
        await this.roomOrderService.createAsync(roomOrderListHandler);
        const serviceOrderListHandler = _(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.services)
            .map((item) => ({
            orderId: order.id,
            serviceId: item.id,
            quanlity: item.quanlity,
            accountId: user.accountId,
        }))
            .value();
        await this.seriveOrderService.createAsync(serviceOrderListHandler);
        const otherOrderListHandler = _(createOrderDto === null || createOrderDto === void 0 ? void 0 : createOrderDto.others)
            .map((item) => (Object.assign(Object.assign({}, item), { orderId: order.id, accountId: user.accountId })))
            .value();
        await this.otherOrderService.createAsync(otherOrderListHandler);
        return order;
    }
    async createUpdateOrder(createUpdateOrderDto, user) {
        var _a, _b;
        try {
            if (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.orderId) {
                if (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.room) {
                    const newRoomOrder = new core_2.CreatedRoomOrderDto();
                    newRoomOrder.roomId = createUpdateOrderDto.room.id;
                    newRoomOrder.accountId = user.accountId;
                    newRoomOrder.orderId = createUpdateOrderDto.orderId;
                    return this.roomOrderService.createAsync([newRoomOrder]);
                }
                else if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.customer) &&
                    createUpdateOrderDto.orderId) {
                    const findIdCardList = await this.customerService.findByIdCards(user, [(_a = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.customer) === null || _a === void 0 ? void 0 : _a.idCard]);
                    if (findIdCardList.length > 0) {
                        const newCustomerOrder = new core_2.CreatedCustomerOrderDto();
                        newCustomerOrder.accountId = user.accountId;
                        newCustomerOrder.customerId = (_b = findIdCardList[0]) === null || _b === void 0 ? void 0 : _b.id;
                        newCustomerOrder.orderId = createUpdateOrderDto.orderId;
                        this.customerOrderService.createAsync([newCustomerOrder], user);
                    }
                    else {
                        const newCustomer = new core_2.CreateCustomerDto();
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
                        const newCustomerOrder = new core_2.CreatedCustomerOrderDto();
                        newCustomerOrder.accountId = user.accountId;
                        newCustomerOrder.customerId = customer[0].id;
                        newCustomerOrder.orderId = createUpdateOrderDto.orderId;
                        return this.customerOrderService.createAsync(newCustomerOrder, user);
                    }
                }
                else if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.service) &&
                    createUpdateOrderDto.orderId) {
                    const newServiceOrder = new core_2.CreatedServiceOrderDto();
                    newServiceOrder.quanlity = createUpdateOrderDto.service.quanlity;
                    newServiceOrder.serviceId = createUpdateOrderDto.service.serviceId;
                    newServiceOrder.accountId = user.accountId;
                    newServiceOrder.orderId = createUpdateOrderDto.orderId;
                    return this.seriveOrderService.createAsync([newServiceOrder]);
                }
                else if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.checkInDate) ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.checkOutDate)) {
                    const newUpdate = new core_2.UpdateOrderDto();
                    if (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.checkInDate)
                        newUpdate.checkInDate = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.checkInDate;
                    if (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.checkOutDate)
                        newUpdate.checkOutDate = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.checkOutDate;
                    return this.orderService.updateAsync(createUpdateOrderDto.orderId, newUpdate, user);
                }
                else if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numDays) ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numNights) ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numHours) ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numMoreHours) ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numDays) == 0 ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numNights) == 0 ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numHours) == 0 ||
                    (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numMoreHours) == 0) {
                    const newUpdate = new core_2.UpdateOrderDto();
                    if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numDays) ||
                        (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numDays) == 0)
                        newUpdate.numDays = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numDays;
                    if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numNights) ||
                        (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numNights) == 0)
                        newUpdate.numNights = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numNights;
                    if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numHours) ||
                        (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numHours) == 0)
                        newUpdate.numHours = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numHours;
                    if ((createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numMoreHours) ||
                        (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numMoreHours) == 0)
                        newUpdate.numMoreHours = createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.numMoreHours;
                    return this.orderService.updateAsync(createUpdateOrderDto.orderId, newUpdate, user);
                }
                else if (createUpdateOrderDto === null || createUpdateOrderDto === void 0 ? void 0 : createUpdateOrderDto.other) {
                    const newOtherOrder = new core_2.CreatedOtherOrderDto();
                    newOtherOrder.accountId = user.accountId;
                    newOtherOrder.orderId = createUpdateOrderDto.orderId;
                    return this.otherOrderService.createAsync([newOtherOrder]);
                }
            }
            else {
                throw new common_1.NotFoundException('Order Not Found !');
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateOrder(updateOrderDto, user, id) {
        return await this.orderService.updateAsync(id, updateOrderDto, user);
    }
    async changeStatusOrder(status, user, id) {
        const order = await this.orderService.findOneAsync(id, user);
        if (order) {
            const rooms = _(order === null || order === void 0 ? void 0 : order.roomOrder)
                .map((item) => item === null || item === void 0 ? void 0 : item.roomId)
                .value();
            await this.roomService.updateStatusAsync(rooms, changeState(status.status));
        }
        const update = new core_2.UpdateOrderDto();
        update.status = status.status;
        const result = await this.orderService.updateAsync(id, update, user);
        if (status.status == TYPE.OrderStatus.Completed) {
            const newRevenue = new core_2.CreateRevenueDto();
            newRevenue.accountId = user.accountId;
            newRevenue.memberId = user.id;
            newRevenue.referenceId = order.id;
            newRevenue.referenceType = TYPE.REVENUE_TYPE.ORDER;
            newRevenue.type = TYPE.REVENUE_STATE.REVENUE;
            newRevenue.amount = await this.orderService.sumTotalMoneyOfOrder(id, user);
            this.revenueService.createAsync(newRevenue, user);
        }
        return result;
    }
    async removeOrder(id, user) {
        return await this.orderService.removeAsync(id, user);
    }
    async restoreOrder(id, user) {
        return await this.orderService.restoreAsync(id, user);
    }
    async deleteOrder(id, user) {
        return await this.orderService.deleteAsync(id, user);
    }
    async countRoomsStatus(user, request) {
        return await this.orderService.countRoomStatusByTime(user, request);
    }
    async countRoomsStatusCurrent(user, request) {
        return await this.orderService.countRoomStatusCurrent(user, request);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('create-update-order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createUpdateOrder", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateOrderDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "changeStatusOrder", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "removeOrder", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "restoreOrder", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Get)('/count-rooms-status'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "countRoomsStatus", null);
__decorate([
    (0, common_1.Get)('/count-order-status-current'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "countRoomsStatusCurrent", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.OrderService,
        core_1.CustomerService,
        core_1.RoomOrderService,
        core_1.CustomerOrderService,
        core_1.ServiceOrderService,
        core_1.RoomService,
        core_1.RevenueService,
        core_1.OtherOrderService])
], OrderController);
exports.OrderController = OrderController;
function changeState(status) {
    if (status == Order_1.OrderStatus.Unconfirmed)
        return TYPE.RoomStatus.Unconfirmed;
    else if (status == Order_1.OrderStatus.Confirmed)
        return TYPE.RoomStatus.Payment;
    else if (status == Order_1.OrderStatus.Completed)
        return TYPE.RoomStatus.Ready;
}
//# sourceMappingURL=OrderController.js.map