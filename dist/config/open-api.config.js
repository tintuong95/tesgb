"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configOpenApi = void 0;
const swagger_1 = require("@nestjs/swagger");
const config = new swagger_1.DocumentBuilder()
    .setTitle('Banvenha.com')
    .setDescription('Banvenha.com list API ')
    .setVersion('1.0')
    .addTag('banvenha')
    .build();
function configOpenApi(app) {
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.configOpenApi = configOpenApi;
//# sourceMappingURL=open-api.config.js.map