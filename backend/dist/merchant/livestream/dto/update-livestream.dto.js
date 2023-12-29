"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLivestreamDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_livestream_dto_1 = require("./create-livestream.dto");
class UpdateLivestreamDto extends (0, mapped_types_1.PartialType)(create_livestream_dto_1.CreateLivestreamDto) {
}
exports.UpdateLivestreamDto = UpdateLivestreamDto;
//# sourceMappingURL=update-livestream.dto.js.map