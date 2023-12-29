import { ArgumentMetadata, BadRequestException, FileValidator, Injectable, PipeTransform } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
interface FilesSchema {
    filesSchema:Array<{fieldName:string,fileType:string|RegExp,maxSize:number}>
}

@Injectable()
export class FilesValidator extends FileValidator<FilesSchema> {
    isValid(file?: IFile | IFile[] | Record<string, IFile[]>|{[key:string]:Express.Multer.File[]}): boolean | Promise<boolean> {
        this.validationOptions.filesSchema.forEach( fileSchema => {
            file = file as {[key:string]:Express.Multer.File[]}
            if (Object.keys(file).length != this.validationOptions.filesSchema.length) {
                throw new BadRequestException(`Invalid FileSchema: FilesFieldsIntercepor has ${Object.keys(file).length} not ${this.validationOptions.filesSchema.length}`)
            }
            if (!file[fileSchema.fieldName]) {
                throw new BadRequestException(`FileSchema ${fileSchema.fieldName} doesn't exist in FilesFieldsInterceptor`)
            }
            const pattern = new RegExp(fileSchema.fileType);
            if (!pattern.test(file[fileSchema.fieldName][0].mimetype)) {
                throw new BadRequestException(`${fileSchema.fieldName} is not a type of ${fileSchema.fileType}`)
            }
            if (file[fileSchema.fieldName][0].size > fileSchema.maxSize) {
                throw new BadRequestException(`${fileSchema.fieldName} must be less than ${fileSchema.maxSize}`)
            }
        });
        return true;
    }
    buildErrorMessage(file: any): string {
        return "Unexpected Error"
    }
}
