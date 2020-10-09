import { Body, Controller, Delete, Get, HttpServer, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@ApiTags('Mensajes')
@Controller('mensajes')
export class MensajesController {
    // el controlador provee los metodos para la api, se comunica con el servicio para realizar la carga de datos o consultas
    
    constructor(private mensajeService: MensajesService){}
    
    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        this.mensajeService.createMensaje(createMensajeDto).then(
            data => {
                response.status(HttpStatus.CREATED).json(data)
            }
        ).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({
                mensaje: 'error al crear el mensaje'
            })
        })
    }

    @Get()
    getAll(@Res() response) {
        this.mensajeService.getAll().then(mensajeList => {
            response.status(HttpStatus.OK).json(mensajeList)
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({
                mensaje: 'error al traer todos los mensajes'
            })
        })
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idM){
        this.mensajeService.updateMensaje(idM, updateMensajeDto).then(data => {
            response.status(HttpStatus.OK).json(data)
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({
                mensaje: 'error al actualizar el mensaje'
            })
        })
    }

    @Delete(':id')
    delete(@Param('id') id, @Res() response){
        this.mensajeService.deleteMensaje(id).then(data=>{
            response.status(HttpStatus.OK).json(data)
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({
                mensaje: 'error al eliminar el mensaje'
            })
        })
    }
}













