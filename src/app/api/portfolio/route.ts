import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { portfolioItems } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const items = await db.select().from(portfolioItems).orderBy(portfolioItems.createdAt);
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const [newItem] = await db.insert(portfolioItems).values(body).returning();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
  }
}
