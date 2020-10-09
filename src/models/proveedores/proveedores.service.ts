import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorDataBaseException } from 'src/err/data-base.err';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';
import { ProveedoreRepository } from './entities/proveedore.repository';

@Injectable()
export class ProveedoresService {
  constructor(
    private proveedoreRepository: ProveedoreRepository
){}

/**
   * ===========================================================================================
   *
   * Creacion de un Proveedor
   *
   * ===========================================================================================
   */

  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      return await this.proveedoreRepository.save(createProveedoreDto);
    } catch (error) {
      throw new ErrorDataBaseException(error, 'Error al cargar un rubro');
    }
  }

  /**
   * ===========================================================================================
   *
   * CListado de todos los proveedores
   *
   * ===========================================================================================
   */

  async findAll(): Promise<Proveedore[]> {
    let proveedores:Proveedore[];

    try {
      proveedores = await this.proveedoreRepository.find()
    } catch(err) {
      throw new ErrorDataBaseException(err, 'Error al obtener los proveedores')
    }

    return proveedores
  }

  /**
   * ===========================================================================================
   *
   * Busca a un Proveedor por el @param id
   *
   * ===========================================================================================
   */

  async findOne(id: string): Promise<Proveedore> {
    let proveedor: Proveedore;
    try {
      proveedor = await this.proveedoreRepository.findOne(id);
    } catch (error) {
      throw new ErrorDataBaseException(error, `Error al intentar obtener el proveedor ${id}`);
    }
    if (!proveedor) {
      throw new NotFoundException('Proveedore no encontrado');
    }
    return proveedor;
  }

   /**
   * ===========================================================================================
   *
   * Actualiar un Proveedor por el @param id
   *
   * ===========================================================================================
   */

  async update(updateProveedoreDTO: UpdateProveedoreDto
    ): Promise<Proveedore> {

    try {
      await this.proveedoreRepository.save(updateProveedoreDTO);
      const result: Proveedore = await this.findOne(updateProveedoreDTO.id);
      return result;
    } catch (err) {
      throw new ErrorDataBaseException(err, `Error al intentar actualizar los datos del proveedor`);
    }
  }

  /**
   * ===========================================================================================
   *
   * Elimina suavemente (SoftDelete) un Proveedor a partir del @param id
   *
   * ===========================================================================================
   */
  async delete(id: string): Promise<Proveedore> {
    let proveedorDelete: Proveedore;

    try {
      proveedorDelete = await this.proveedoreRepository.findOne(id);
    } catch (error) {
      throw new ErrorDataBaseException(error, `Error al intentar obtener a la Proveedor ${id}`);
    }

    if (!proveedorDelete) {
      throw new NotFoundException('Proveedor no encontrado');
    } else {
      try {
        await this.proveedoreRepository.softRemove(proveedorDelete);
        return proveedorDelete;
      } catch (error) {
        throw new ErrorDataBaseException(error, `Error al intentar eliminar a la proveedor ${id}`);
      }
    }
  }


  
  /**
   * ===========================================================================================
   *
   * Restaura un Aviso a partir del @param id
   *
   * ===========================================================================================
   */
  async restore(id: string): Promise<Proveedore> {
    let proveedoreRestore: Proveedore;

    try {
      proveedoreRestore = await this.proveedoreRepository.findOne(id, {
        withDeleted: true,
      });
    } catch (error) {
      throw new ErrorDataBaseException(error, `Error al intentar obtener a la aviso ${id}`);
    }

    if (!proveedoreRestore) {
      throw new NotFoundException('Aviso no encontrado');
    } else {
      try {
        return await this.proveedoreRepository.recover(proveedoreRestore);
      } catch (error) {
        throw new ErrorDataBaseException(error, `Error al intentar recuperar a la aviso ${id}`);
      }
    }
  }

}
