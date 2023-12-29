"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesValidator = void 0;
const common_1 = require("@nestjs/common");
let FilesValidator = class FilesValidator extends common_1.FileValidator {
    isValid(file) {
        this.validationOptions.filesSchema.forEach(fileSchema => {
            file = file;
            if (Object.keys(file).length != this.validationOptions.filesSchema.length) {
                throw new common_1.BadRequestException(`Invalid FileSchema: FilesFieldsIntercepor has ${Object.keys(file).length} not ${this.validationOptions.filesSchema.length}`);
            }
            if (!file[fileSchema.fieldName]) {
                throw new common_1.BadRequestException(`FileSchema ${fileSchema.fieldName} doesn't exist in FilesFieldsInterceptor`);
            }
            const pattern = new RegExp(fileSchema.fileType);
            if (!pattern.test(file[fileSchema.fieldName][0].mimetype)) {
                throw new common_1.BadRequestException(`${fileSchema.fieldName} is not a type of ${fileSchema.fileType}`);
            }
            if (file[fileSchema.fieldName][0].size > fileSchema.maxSize) {
                throw new common_1.BadRequestException(`${fileSchema.fieldName} must be less than ${fileSchema.maxSize}`);
            }
        });
        return true;
    }
    buildErrorMessage(file) {
        return "Unexpected Error";
    }
};
exports.FilesValidator = FilesValidator;
exports.FilesValidator = FilesValidator = __decorate([
    (0, common_1.Injectable)()
], FilesValidator);
//# sourceMappingURL=files.validator.js.map