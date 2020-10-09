import { EntityRepository, Repository } from "typeorm";
import { Mensaje } from "./mensaje.entity";

@EntityRepository(Mensaje)
export class MensajeRepository extends Repository<Mensaje>{}