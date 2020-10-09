import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';
import { MensajeRepository } from './entities/mensaje.repository';

@Injectable()
export class MensajesService {
    // en el servicio, realizamos un Inject Reporitory de tipo Mensaje para controlar la carga en la base de datos, el servicio se encargara de guardar los datos en la base de datos
    constructor(
        private mensajeRepository:MensajeRepository
    ){}
    
    async getAll(): Promise<Mensaje[]>{
        return await this.mensajeRepository.find(); 
    }
    
    async createMensaje(body: CreateMensajeDto): Promise<Mensaje>{
        const newMensaje = new Mensaje();
        newMensaje.mensaje = body.mensaje;
        newMensaje.nick = body.nick;

        return this.mensajeRepository.save(newMensaje)
    }


    async updateMensaje(id: number ,body: CreateMensajeDto): Promise<Mensaje>{
        const updateMensaje = await this.mensajeRepository.findOne(id);
        // validacion
        updateMensaje.nick = body.nick
        updateMensaje.mensaje = body.mensaje
        
        return this.mensajeRepository.save(updateMensaje)

    }

    //se devuelve un any porque no se sabe que retornara al eliminar
    async deleteMensaje(id: number): Promise<any> {
        return await this.mensajeRepository.delete(id)
    }
}
