/// <reference types="multer" />
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { SupabaseService } from 'src/microservices/supabase/supabase.service';
export declare class CategoryService {
    private prisma;
    private supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        icon: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
}
