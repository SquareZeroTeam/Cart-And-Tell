import { PartialType } from '@nestjs/mapped-types';
import { CreateVerifyEmailDto } from './create-verify-email.dto';

export class UpdateVerifyEmailDto extends PartialType(CreateVerifyEmailDto) {}
