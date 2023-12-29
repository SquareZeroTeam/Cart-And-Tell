/// <reference types="multer" />
import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
interface FilesSchema {
    filesSchema: Array<{
        fieldName: string;
        fileType: string | RegExp;
        maxSize: number;
    }>;
}
export declare class FilesValidator extends FileValidator<FilesSchema> {
    isValid(file?: IFile | IFile[] | Record<string, IFile[]> | {
        [key: string]: Express.Multer.File[];
    }): boolean | Promise<boolean>;
    buildErrorMessage(file: any): string;
}
export {};
