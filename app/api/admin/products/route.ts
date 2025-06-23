import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request) { // Add req parameter
    const user = await verifyToken(req);

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        const categories = Array.from(new Set(products.map(p => p.category))); // Corrected Set to Array conversion
        return NextResponse.json({ products, categories });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const user = await verifyToken(req);

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const newProduct = await prisma.product.create({
            data: body,
        });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const user = await verifyToken(req);

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { ids } = await req.json();
        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        await prisma.product.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return NextResponse.json({ message: `${ids.length} products deleted` }, { status: 200 });
    } catch (error) {
        console.error('Error deleting products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
