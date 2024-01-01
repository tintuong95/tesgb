"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = require("./config/configuration");
const db_config_1 = require("./config/db.config");
const core_1 = require("@nestjs/core");
const pipes_1 = require("@nestjs/common/pipes");
const core_2 = require("./Modules/core");
const RoomTypeModule_1 = require("./Modules/RoomTypeModule");
const FloorModule_1 = require("./Modules/FloorModule");
const exception_filter_1 = require("./Utils/exception.filter");
const ServiceModule_1 = require("./Modules/ServiceModule");
const ServiceTypeModule_1 = require("./Modules/ServiceTypeModule");
const AuthModule_1 = require("./Modules/AuthModule");
const RevenueModule_1 = require("./Modules/RevenueModule");
const PriceItemModule_1 = require("./Modules/PriceItemModule");
const UnitModule_1 = require("./Modules/UnitModule");
const GenerateModule_1 = require("./Modules/GenerateModule");
const MailModule_1 = require("./Modules/MailModule");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(configuration_1.envConfig),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => (0, db_config_1.dbConfig)(configService),
                inject: [config_1.ConfigService],
            }),
            core_2.AccountModule,
            core_2.CustomerModule,
            core_2.CustomerOrderModule,
            core_2.EmployeesModule,
            core_2.FeedbackModule,
            FloorModule_1.FloorModule,
            core_2.LogModule,
            core_2.MemberModule,
            core_2.OrderModule,
            core_2.PaymentModule,
            core_2.PayrollModule,
            core_2.PriceModule,
            core_2.ProductModule,
            core_2.PromotionModule,
            core_2.ReportModule,
            core_2.RoleModule,
            core_2.RoomModule,
            RoomTypeModule_1.RoomTypeModule,
            ServiceModule_1.ServiceModule,
            core_2.ServiceOrderModule,
            ServiceTypeModule_1.ServiceTypeModule,
            core_2.StaffModule,
            core_2.StockModule,
            core_2.StockHistoryModule,
            core_2.RoomOrderModule,
            AuthModule_1.AuthModule,
            RevenueModule_1.RevenueModule,
            PriceItemModule_1.PriceItemModule,
            UnitModule_1.UnitModule,
            GenerateModule_1.GenerateModule,
            MailModule_1.MailModule,
            core_2.OtherOrderModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useFactory: () => new pipes_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                }),
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map