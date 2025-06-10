import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, ZodError } from 'zod';

export interface ValidationError {
  success: false;
  error: string;
  details: Record<string, string[]>;
}

export interface ValidationSuccess<T> {
  success: true;
  data: T;
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  try {
    const body = await request.json();
    const validatedData = schema.parse(body);
    
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const details: Record<string, string[]> = {};
      
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!details[path]) {
          details[path] = [];
        }
        details[path].push(err.message);
      });

      return {
        success: false,
        error: 'Validation failed',
        details,
      };
    }

    return {
      success: false,
      error: 'Invalid JSON in request body',
      details: {},
    };
  }
}

export function createValidationErrorResponse(
  validation: ValidationError,
  status: number = 400
): NextResponse {
  return NextResponse.json(validation, { status });
} 