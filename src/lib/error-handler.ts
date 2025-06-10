import { NextResponse } from 'next/server';

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export function createErrorResponse(
  error: Error | AppError | string,
  fallbackStatus: number = 500
): NextResponse {
  if (typeof error === 'string') {
    return NextResponse.json(
      {
        success: false,
        error,
      } as ApiError,
      { status: fallbackStatus }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
      } as ApiError,
      { status: error.statusCode }
    );
  }

  // Generic error
  console.error('Unhandled error:', error);
  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error',
    } as ApiError,
    { status: 500 }
  );
} 