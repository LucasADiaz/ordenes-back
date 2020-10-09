import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedoreDto } from './create-proveedore.dto';
import {IsNotEmpty, MaxLength, IsString, IsOptional, IsUUID, IsDefined} from 'class-validator';
import { Proveedore } from '../entities/proveedore.entity';
import { ExistId } from 'src/validators/exist-id.validator';

export class UpdateProveedoreDto extends PartialType(CreateProveedoreDto) {
  @IsDefined()
  @IsUUID()
  @ExistId(Proveedore, {message: 'proveedor.id no se encuentra en la base de datos'})
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  direccion?: string;
}