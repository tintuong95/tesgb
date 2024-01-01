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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const Stock_1 = require("./Stock");
const relation_1 = require("../contants/relation");
const Customer_1 = require("./Customer");
const CustomerOrder_1 = require("./CustomerOrder");
const Employees_1 = require("./Employees");
const Feedback_1 = require("./Feedback");
const Floor_1 = require("./Floor");
const Log_1 = require("./Log");
const Member_1 = require("./Member");
const Order_1 = require("./Order");
const Payment_1 = require("./Payment");
const Payrolls_1 = require("./Payrolls");
const Price_1 = require("./Price");
const Product_1 = require("./Product");
const Promotion_1 = require("./Promotion");
const Report_1 = require("./Report");
const Role_1 = require("./Role");
const Room_1 = require("./Room");
const RoomOrder_1 = require("./RoomOrder");
const RoomType_1 = require("./RoomType");
const Service_1 = require("./Service");
const ServiceOrder_1 = require("./ServiceOrder");
const ServiceType_1 = require("./ServiceType");
const Staff_1 = require("./Staff");
const StockHistory_1 = require("./StockHistory");
const Revenue_1 = require("./Revenue");
const PriceItem_1 = require("./PriceItem");
const TYPE = require("./Types/core");
const OtherOrder_1 = require("./OtherOrder");
let Account = class Account extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.CUSTOMER_RELATION, _b = relation_1.CUSTOMER_ORDER_RELATION, _c = relation_1.EMPLOYEE_RELATION, _d = relation_1.FEED_BACK_RELATION, _e = relation_1.FLOOR_RELATION, _f = relation_1.LOG_RELATION, _g = relation_1.MEMBER_RELATION, _h = relation_1.ORDER_RELATION, _j = relation_1.PAYMENT_RELATION, _k = relation_1.PAYROLL_RELATION, _l = relation_1.PRICE_RELATION, _m = relation_1.PRODUCT_RELATION, _o = relation_1.PROMOTION_RELATION, _p = relation_1.REPORT_RELATION, _q = relation_1.ROLE_RELATION, _r = relation_1.ROOM_RELATION, _s = relation_1.ROOM_ORDER_RELATION, _t = relation_1.ROOM_TYPE_RELATION, _u = relation_1.SERVICE_RELATION, _v = relation_1.SERVICE_ORDER_RELATION, _w = relation_1.SERVICE_TYPE_RELATION, _x = relation_1.STAFF_RELATION, _y = relation_1.STOCK_RELATION, _z = relation_1.STOCK_HISTORY_RELATION, _0 = relation_1.REVENUE_RELATION, _1 = relation_1.PRICE_ITEM_RELATION, _2 = relation_1.OTHER_ORDER_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "nameHotel", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "codeBank", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Account.prototype, "nameBank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Account.prototype, "accountBank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Account.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.ACCOUNT_TYPE,
        default: TYPE.ACCOUNT_TYPE.Basic,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Account.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.ACCOUNT_STATUS,
        default: TYPE.ACCOUNT_STATUS.Unconfirmed,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Account.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Account.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => Customer_1.Customer, (Customer) => Customer[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomerOrder_1.CustomerOrder, (CustomerOrder) => CustomerOrder[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Employees_1.Employee, (Employee) => Employee[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _c, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Feedback_1.Feedback, (Feedback) => Feedback[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _d, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Floor_1.Floor, (Floor) => Floor[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _e, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Log_1.Log, (Log) => Log[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _f, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Member_1.Member, (Member) => Member[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _g, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (Order) => Order[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _h, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Payment_1.Payment, (Payment) => Payment[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _j, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Payrolls_1.Payroll, (Payroll) => Payroll[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _k, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Price_1.Price, (Price) => Price[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _l, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (Product) => Product[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _m, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Promotion_1.Promotion, (Promotion) => Promotion[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _o, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Report_1.Report, (Report) => Report[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _p, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Role_1.Role, (Role) => Role[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _q, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Room_1.Room, (Room) => Room[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _r, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RoomOrder_1.RoomOrder, (RoomOrder) => RoomOrder[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _s, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RoomType_1.RoomType, (RoomType) => RoomType[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _t, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Service_1.Service, (Service) => Service[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _u, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceOrder_1.ServiceOrder, (ServiceOrder) => ServiceOrder[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _v, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceType_1.ServiceType, (ServiceType) => ServiceType[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _w, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Staff_1.Staff, (Staff) => Staff[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _x, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Stock_1.Stock, (Stock) => Stock[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _y, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StockHistory_1.StockHistory, (StockHistory) => StockHistory[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _z, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Revenue_1.Revenue, (Revenue) => Revenue[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _0, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PriceItem_1.PriceItem, (PriceItem) => PriceItem[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _1, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OtherOrder_1.OtherOrder, (OtherOrder) => OtherOrder[relation_1.ACCOUNT_RELATION]),
    __metadata("design:type", Array)
], Account.prototype, _2, void 0);
Account = __decorate([
    (0, typeorm_1.Entity)({ name: 'Accounts' })
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map