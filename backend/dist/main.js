"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const logger = require("morgan");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(logger('dev'));
    app.use((0, helmet_1.default)());
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'templates'));
    app.enableCors();
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map