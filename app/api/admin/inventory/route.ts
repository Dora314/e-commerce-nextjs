import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const products = await prisma.product.findMany();

        const inventory = products.map(product => {
            const productWithInventory = product as any; // Type assertion for new fields
            const quantity = product.stock;
            const status =
                quantity === 0
                    ? 'out-of-stock'
                    : quantity <= (productWithInventory.reorderPoint || 10)
                        ? 'low-stock'
                        : quantity >= (productWithInventory.maxStock || 100)
                            ? 'overstocked'
                            : 'in-stock';

            return {
                id: product.id,
                name: product.name,
                sku: productWithInventory.sku || `SKU-${product.id.substring(0, 8).toUpperCase()}`,
                category: product.category,
                currentStock: quantity,
                minStock: productWithInventory.minStock || 5,
                maxStock: productWithInventory.maxStock || 100,
                reorderPoint: productWithInventory.reorderPoint || 10,
                unitCost: productWithInventory.unitCost || product.price,
                totalValue: (productWithInventory.unitCost || product.price) * quantity,
                supplier: productWithInventory.supplier || 'N/A',
                status: status,
                lastRestocked: product.updatedAt.toISOString().split('T')[0],
                imageUrl: product.images[0] ?? '/placeholder.svg',
            };
        });

        return NextResponse.json(inventory);
    } catch (error) {
        console.error('[ADMIN_INVENTORY_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, minStock, maxStock, reorderPoint, unitCost, supplier } = body;

        if (!id) {
            return new NextResponse('Missing product ID', { status: 400 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(minStock && { minStock: parseInt(minStock) }),
                ...(maxStock && { maxStock: parseInt(maxStock) }),
                ...(reorderPoint && { reorderPoint: parseInt(reorderPoint) }),
                ...(unitCost && { unitCost: parseFloat(unitCost) }),
                ...(supplier && { supplier }),
            } as any // Type assertion for new fields
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('[ADMIN_INVENTORY_PUT]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
