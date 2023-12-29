import { PartialType } from '@nestjs/mapped-types';
import { CreateOcbcDto } from './create-ocbc.dto';

export class UpdateOcbcDto extends PartialType(CreateOcbcDto) {}
