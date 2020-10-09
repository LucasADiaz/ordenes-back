import { IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProveedoreDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    direccion: string;
}