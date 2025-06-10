import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

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
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    
    const newUser = await db.insert(users).values({
      name,
      email,
    }).returning();

    return NextResponse.json({
      success: true,
      user: newUser[0]
    });
  } catch (error) {
    console.error('Database insert error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 