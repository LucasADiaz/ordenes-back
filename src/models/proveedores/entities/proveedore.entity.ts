import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'proveedores'})
export class Proveedore {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =======================================================================
  // COLUMNAS PROPIAS DE LA TABLA
  // =======================================================================

  @Column('varchar', {length: 100})
  nombre: string;
  
  @Column('varchar', {length: 100})
  direccion: string;

  // =======================================================================
  // COLUMNAS POR DEFECTO
  // =======================================================================
  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({type: 'timestamp', name: 'delete_at'})
  deletedAt: Date;
}
