import { Controller, FileTypeValidator, FileValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/authentication/auth/jwt.auth.guard';

@Controller('supabase')
@UseGuards(JwtAuthGuard, IsAdminGuard)
export class SupabaseController {
    constructor(private readonly supabaseService: SupabaseService) { }
    @Post("upload")
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile(new ParseFilePipe({
        fileIsRequired: true,
        validators: [new FileTypeValidator({ fileType: 'image/*' })]
    }
    )) image: Express.Multer.File) {
        return await this.supabaseService.uploadImageTinyMCEHandler(image);
    }
}
