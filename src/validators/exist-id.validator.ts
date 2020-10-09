import {registerDecorator, ValidationOptions} from 'class-validator';
import {getRepository} from 'typeorm';

export function ExistId(entity, validationOptions?: ValidationOptions) {
  return function(object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(id: string): Promise<boolean> {
          return getRepository(entity)
            .findOne(id)
            .then((data) => {
              if (data) {
                return true;
              } else {
                return false;
              }
            });
        },
      },
    });
  };
}
