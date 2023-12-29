/// <reference types="multer" />
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    findOne(id: string): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        icon: string;
    }>;
}
