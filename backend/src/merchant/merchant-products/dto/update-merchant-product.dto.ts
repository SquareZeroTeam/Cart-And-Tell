import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantProductDto } from './create-merchant-product.dto';

export class UpdateMerchantProductDto extends PartialType(CreateMerchantProductDto) {}
