import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { portfolioItems } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam);
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    
    if (!item) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam);
    const body = await request.json();
    
    const [updatedItem] = await db
      .update(portfolioItems)
      .set({ ...body, updatedAt: new Date().toISOString() })
      .where(eq(portfolioItems.id, id))
      .returning();

    if (!updatedItem) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam);
    
    const [deletedItem] = await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, id))
      .returning();

    if (!deletedItem) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}
