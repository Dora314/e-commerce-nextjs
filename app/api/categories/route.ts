import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.product.findMany({
            distinct: ['category'],
            select: {
                category: true,
            },
        });

        // The result is an array of objects, e.g., [{ category: 'Electronics' }, { category: 'Books' }]
        // We'll map it to a simple array of strings: ['Electronics', 'Books']
        const categoryNames = categories.map((item) => item.category);

        return NextResponse.json(categoryNames);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
