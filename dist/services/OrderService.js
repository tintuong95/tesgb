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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
const price_1 = require("../Utils/price");
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { id = '', status = '', startDate = '', endDate = '', } = request.query;
            const result = this.orderRepository
                .createQueryBuilder('orders')
                .leftJoinAndSelect('orders.roomOrder', 'roomOrders', 'orders.id=roomOrders.orderId')
                .leftJoinAndSelect('orders.customerOrder', 'customerOrders', 'orders.id=customerOrders.orderId')
                .leftJoinAndSelect('orders.otherOrder', 'otherOrders', 'orders.id=otherOrders.orderId')
                .leftJoinAndSelect('roomOrders.room', 'rooms', 'roomOrders.roomId=rooms.id')
                .where(`orders.deletedAt IS NULL`)
                .andWhere(`orders.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('orders.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            status &&
                result.andWhere('orders.status = :status', {
                    status: `${status}`,
                });
            id &&
                result.andWhere('orders.id LIKE :id', {
                    id: `%${id}%`,
                });
            startDate &&
                result.andWhere('orders.createdAt >= :startDate', {
                    startDate: new Date(startDate.toString()),
                });
            endDate &&
                result.andWhere('orders.createdAt <= :endDate', {
                    endDate: new Date(endDate.toString()),
                });
            const count = await result.getCount();
            const orders = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [orders, count], currentPage, perPage);
        }
        catch (err) {
            console.error(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = this.orderRepository
                .createQueryBuilder('orders')
                .leftJoinAndSelect('orders.roomOrder', 'roomOrders', 'orders.id=roomOrders.orderId')
                .leftJoinAndSelect('orders.otherOrder', 'otherOrders', 'orders.id=otherOrders.orderId')
                .leftJoinAndSelect('orders.customerOrder', 'customerOrders', 'orders.id=customerOrders.orderId')
                .leftJoinAndSelect('orders.serviceOrder', 'serviceOrders', 'orders.id=serviceOrders.orderId')
                .leftJoinAndSelect('serviceOrders.service', 'services', 'serviceOrders.serviceId=services.id')
                .leftJoinAndSelect('roomOrders.room', 'rooms', 'roomOrders.roomId=rooms.id')
                .leftJoinAndSelect('customerOrders.customer', 'customers', 'customerOrders.customerId=customers.id')
                .leftJoinAndSelect('rooms.roomType', 'roomTypes', 'rooms.roomTypeId=roomTypes.id')
                .leftJoinAndSelect('roomTypes.price', 'prices', 'roomTypes.priceId=prices.id')
                .leftJoinAndSelect('prices.priceItem', 'priceItems', 'prices.id=priceItems.priceId')
                .where(`orders.deletedAt IS NULL`)
                .andWhere(`orders.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .andWhere(`orders.id = :id`, {
                id: `${id}`,
            });
            const orders = await result.getOne();
            if (!orders)
                throw new common_2.NotFoundException('Order Id ' + id + ' Not Found !');
            return orders;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createOrderDto, user) {
        try {
            createOrderDto.accountId = user.accountId;
            const result = this.orderRepository.create(createOrderDto);
            return await this.orderRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateOrderDto, user) {
        try {
            const result = await this.orderRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Order Id ' + id + ' Not Found !');
            _(updateOrderDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            if ((updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.numDays) == 0) {
                result.numDays = 0;
            }
            else if ((updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.numNights) == 0) {
                result.numNights = 0;
            }
            else if ((updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.numHours) == 0) {
                result.numHours = 0;
            }
            else if ((updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.numMoreHours) == 0) {
                result.numMoreHours = 0;
            }
            return this.orderRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.orderRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Order Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Order Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.orderRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Order Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Order Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.orderRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Order Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Order Id ' + id + ' Not Found !');
    }
    async findOrderByListRoomId(idList, user) {
        const result = this.orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.roomOrder', 'roomOrders', 'orders.id=roomOrders.orderId')
            .where(`orders.deletedAt IS NULL`)
            .andWhere(`orders.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere(`orders.status = :status`, {
            status: `2`,
        })
            .andWhere('orders.status = :status1 OR orders.status = :status2', {
            status1: 1,
            status2: 2,
        })
            .andWhere('roomOrders.roomId IN (:...idList)', { idList })
            .orderBy('orders.createdAt', 'DESC');
        const orders = result.getMany();
        return orders;
    }
    async countRoomStatusByTime(user, request) {
        const { startDate = '', endDate = '' } = request.query;
        const rs = await this.orderRepository
            .createQueryBuilder('orders')
            .where(`orders.deletedAt IS NULL`)
            .andWhere(`orders.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere('orders.createdAt >= :startDate', {
            startDate: new Date(startDate.toString()),
        })
            .andWhere('orders.createdAt <= :endDate', {
            endDate: new Date(endDate.toString()),
        })
            .select([
            'DATE_FORMAT(orders.updatedAt, "%d-%b-%Y") as Date',
            'orders.status as status',
            'COUNT(*) as count',
        ])
            .groupBy('Date, status')
            .getRawMany();
        return rs;
    }
    async countRoomStatusCurrent(user, request) {
        const { status } = request.query;
        const rs = await this.orderRepository
            .createQueryBuilder('orders')
            .where(`orders.deletedAt IS NULL`)
            .andWhere(`orders.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere(`orders.status = :status`, {
            status: status,
        })
            .select('COUNT(*) AS count')
            .getRawOne();
        return rs;
    }
    async sumTotalMoneyOfOrder(id, user) {
        const orderDetails = await this.findOneAsync(id, user);
        const { serviceOrder, roomOrder, otherOrder, numDays, numNights, numHours, numMoreHours, } = orderDetails;
        return +(0, price_1.sumTotal)(numDays, numNights, numHours, numMoreHours, roomOrder, serviceOrder, otherOrder);
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map