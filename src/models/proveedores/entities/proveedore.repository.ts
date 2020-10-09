import { EntityRepository, Repository } from "typeorm";
import { Proveedore } from "./proveedore.entity";

@EntityRepository(Proveedore)
export class ProveedoreRepository extends Repository<Proveedore>{}