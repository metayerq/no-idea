import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { createUserSchema } from '@/lib/validations/user';
import { validateRequest, createValidationErrorResponse } from '@/lib/validation';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json({
      success: true,
      users: allUsers,
      count: allUsers.length
    });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Validate input data
  const validation = await validateRequest(request, createUserSchema);
  
  if (!validation.success) {
    return createValidationErrorResponse(validation);
  }

  try {
    const newUser = await db.insert(users).values({
      id: randomUUID(),
      name: validation.data.name,
      email: validation.data.email,
    }).returning();

    return NextResponse.json({
      success: true,
      user: newUser[0]
    }, { status: 201 });
  } catch (error) {
    console.error('Database insert error:', error);
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address already exists',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create user',
      },
      { status: 500 }
    );
  }
} 