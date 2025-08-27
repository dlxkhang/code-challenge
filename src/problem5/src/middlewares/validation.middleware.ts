import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

interface ValidationOptions {
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
}

export function validateBody<T extends object>(
  dtoClass: new () => T,
  options: ValidationOptions = {
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
  }
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Transform plain object to class instance
      const dto = plainToClass(dtoClass, req.body);

      // Validate the DTO
      const errors: ValidationError[] = await validate(dto as object, options);
      console.log('errors: ', errors);

      if (errors.length > 0) {
        // Format validation errors
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          value: error.value,
          messages: Object.values(error.constraints || {}),
        }));

        return res.status(400).json({
          error: 'Validation failed',
          details: formattedErrors,
        });
      }

      // Add validated DTO to request object
      req.body = dto;
      next();
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error during validation',
      });
    }
  };
}
