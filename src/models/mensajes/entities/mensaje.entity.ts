import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mensajes')
export class Mensaje {
    // define la arquitectura de la tabla
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    mensaje: string;

}
