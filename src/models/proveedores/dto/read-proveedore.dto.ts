import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class ReadProveedoreDto {
    @Expose()
    id: string;
  
    @Expose()
    nombre: string;
    
    @Expose()
    direccion: string;
}