import {HttpException, HttpStatus} from '@nestjs/common';

export class ErrorDataBaseException extends HttpException {
  constructor(err, mensaje: string) {
    super(
      {
        type: ErrorDataBaseException.name,
        description: `Ha ocurrido un error al intentar comunicarse con la base de datos.`,
        content: {
          id: err.errno,
          name: err.name,
          code: err.code,
          title: mensaje,
          detail: err.sqlMessage,
        },
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
