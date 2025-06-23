import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// const prisma = new PrismaClient();

// GET a single product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

// UPDATE a product by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    // TODO: Add admin role verification
    const { id } = params;
    try {
        const body = await request.json();
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// DELETE a product by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    // TODO: Add admin role verification
    const { id } = params;
    try {
        await prisma.product.delete({
            where: { id },
        });
        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
