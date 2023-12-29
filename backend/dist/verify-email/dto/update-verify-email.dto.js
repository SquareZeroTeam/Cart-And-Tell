"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVerifyEmailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_verify_email_dto_1 = require("./create-verify-email.dto");
class UpdateVerifyEmailDto extends (0, mapped_types_1.PartialType)(create_verify_email_dto_1.CreateVerifyEmailDto) {
}
exports.UpdateVerifyEmailDto = UpdateVerifyEmailDto;
//# sourceMappingURL=update-verify-email.dto.js.map