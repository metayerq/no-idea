import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { signUpSchema } from '@/lib/validations/auth';
import { validateRequest, createValidationErrorResponse } from '@/lib/validation';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const validation = await validateRequest(request, signUpSchema);
  
  if (!validation.success) {
    return createValidationErrorResponse(validation);
  }

  const { name, email, password } = validation.data;

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'User with this email already exists',
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      });

    return NextResponse.json(
      {
        success: true,
        user: newUser[0],
        message: 'Account created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create account',
      },
      { status: 500 }
    );
  }
} 