import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id }
        });

        if (!product) {
            return new NextResponse('Product not found', { status: 404 });
        }

        const productWithInventory = product as any;
        const quantity = product.stock;
        const status =
            quantity === 0
                ? 'out-of-stock'
                : quantity <= (productWithInventory.reorderPoint || 10)
                    ? 'low-stock'
                    : quantity >= (productWithInventory.maxStock || 100)
                        ? 'overstocked'
                        : 'in-stock';

        const inventoryItem = {
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

        return NextResponse.json(inventoryItem);
    } catch (error) {
        console.error('[ADMIN_INVENTORY_ITEM_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { stock, minStock, maxStock, reorderPoint, unitCost, supplier, sku } = body;

        const updateData: any = {};

        if (stock !== undefined) updateData.stock = parseInt(stock);
        if (minStock !== undefined) updateData.minStock = parseInt(minStock);
        if (maxStock !== undefined) updateData.maxStock = parseInt(maxStock);
        if (reorderPoint !== undefined) updateData.reorderPoint = parseInt(reorderPoint);
        if (unitCost !== undefined) updateData.unitCost = parseFloat(unitCost);
        if (supplier !== undefined) updateData.supplier = supplier;
        if (sku !== undefined) updateData.sku = sku;

        const updatedProduct = await prisma.product.update({
            where: { id: params.id },
            data: updateData
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('[ADMIN_INVENTORY_ITEM_PUT]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
