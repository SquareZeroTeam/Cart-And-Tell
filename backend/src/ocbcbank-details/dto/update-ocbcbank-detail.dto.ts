import { PartialType } from '@nestjs/mapped-types';
import { CreateOcbcbankDetailDto } from './create-ocbcbank-detail.dto';

export class UpdateOcbcbankDetailDto extends PartialType(CreateOcbcbankDetailDto) {}
