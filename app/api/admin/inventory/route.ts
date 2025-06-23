import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const products = await prisma.product.findMany();

        const inventory = products.map(product => {
            const quantity = product.stock;
            const status =
                quantity === 0
                    ? 'out-of-stock'
                    : quantity < 10
                        ? 'low-stock'
                        : 'in-stock';

            return {
                id: product.id,
                name: product.name,
                sku: `SKU-${product.id.substring(0, 8).toUpperCase()}`,
                category: product.category,
                currentStock: quantity,
                unitCost: product.price,
                status: status,
                supplier: 'N/A', // Supplier info is not in the schema
                totalValue: product.price * quantity,
                lastRestocked: product.updatedAt.toISOString().split('T')[0],
                imageUrl: product.images[0] ?? '/placeholder.svg',
                // Fields from InventoryItem not in Product model - providing defaults
                minStock: 5,
                maxStock: 100,
                reorderPoint: 10,
            };
        });

        return NextResponse.json(inventory);
    } catch (error) {
        console.error('[ADMIN_INVENTORY_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
