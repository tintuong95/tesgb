"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const dist_1 = require("@nestjs/jwt/dist");
const passport_1 = require("@nestjs/passport");
const MemberModule_1 = require("./MemberModule");
const AuthService_1 = require("../Services/AuthService");
const JwtStrategyService_1 = require("../Services/JwtStrategyService");
const AuthController_1 = require("../Controllers/AuthController");
const AccountModule_1 = require("./AccountModule");
const MailModule_1 = require("./MailModule");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            dist_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    return {
                        secret: configService.get('jwt.secret_key'),
                        signOptions: {
                            expiresIn: configService.get('jwt.expiration_time'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            MemberModule_1.MemberModule,
            AccountModule_1.AccountModule,
            MailModule_1.MailModule,
        ],
        providers: [AuthService_1.AuthService, JwtStrategyService_1.JwtStrategyService],
        exports: [AuthService_1.AuthService],
        controllers: [AuthController_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=AuthModule.js.map