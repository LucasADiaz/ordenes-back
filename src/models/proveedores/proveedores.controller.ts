import { Controller, Get, Post, Body, Put, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';
import { plainToClass } from 'class-transformer';
import { ReadProveedoreDto } from './dto/read-proveedore.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}
  
  @Post()
  async create(@Body() createProveedoreDto: CreateProveedoreDto):Promise<ReadProveedoreDto> {
    const proveedor: Proveedore = await this.proveedoresService.create(createProveedoreDto);
    return plainToClass(ReadProveedoreDto, proveedor)
  }

  @Get()
  async findAll(): Promise<ReadProveedoreDto[]> {
    const proveedores: Proveedore[] = await this.proveedoresService.findAll();
    return proveedores.map((proveedor:Proveedore)=> plainToClass(ReadProveedoreDto,proveedor))
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ReadProveedoreDto> {
    const proveedor: Proveedore = await this.proveedoresService.findOne(id);
    return plainToClass(ReadProveedoreDto,proveedor);
  }

  @Put()
  async update(@Body() updateProveedoreDto: UpdateProveedoreDto): Promise<ReadProveedoreDto> {
    const proveedorUpdate = await this.proveedoresService.update(updateProveedoreDto);
    return plainToClass(ReadProveedoreDto, proveedorUpdate)
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ReadProveedoreDto> {
    const proveedorDelete = await this.proveedoresService.delete(id);
    return plainToClass(ReadProveedoreDto, proveedorDelete)
  }
}
