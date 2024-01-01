"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../Services/core");
const mailer_1 = require("@nestjs-modules/mailer");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'mail49.vietnix.vn',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'admin@vnnix.com',
                        pass: 'Tuong0962@',
                    },
                },
                defaults: {
                    from: 'admin@vnnix.com',
                },
            }),
        ],
        providers: [core_1.MailService],
        exports: [core_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=MailModule.js.map