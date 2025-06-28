import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

// const prisma = new PrismaClient();

// Helper function to get user ID from token
async function getUserIdFromToken(request: Request): Promise<string | null> {
    const userPayload = await verifyToken(request);
    return userPayload ? userPayload.userId : null;
}

// GET user's wishlist
export async function GET(request: Request) {
    const userId = await getUserIdFromToken(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const wishlist = await prisma.wishlist.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true, // Include product details
                    },
                },
            },
        });

        if (!wishlist) {
            return NextResponse.json({ items: [] });
        }

        const products = wishlist.items.map(item => item.product);

        return NextResponse.json({ items: products });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}

// ADD item to wishlist
export async function POST(request: Request) {
    const userId = await getUserIdFromToken(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId } = await request.json();
        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        // Find user's wishlist, or create one if it doesn't exist
        let wishlist = await prisma.wishlist.findUnique({ where: { userId } });
        if (!wishlist) {
            wishlist = await prisma.wishlist.create({ data: { userId } });
        }

        // Check if the product is already in the wishlist
        const existingItem = await prisma.wishlistItem.findFirst({
            where: {
                wishlistId: wishlist.id,
                productId: productId,
            },
        });

        if (existingItem) {
            return NextResponse.json({ message: 'Product already in wishlist' }, { status: 200 });
        }

        const newItem = await prisma.wishlistItem.create({
            data: {
                wishlistId: wishlist.id,
                productId: productId,
            },
            include: { product: true },
        });

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 });
    }
}

// DELETE item from wishlist
export async function DELETE(request: Request) {
    const userId = await getUserIdFromToken(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { productId } = await request.json(); // Expect productId in the body
        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const wishlist = await prisma.wishlist.findUnique({ where: { userId } });
        if (!wishlist) {
            return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
        }

        await prisma.wishlistItem.deleteMany({
            where: {
                wishlistId: wishlist.id,
                productId: productId,
            },
        });

        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete wishlist item' }, { status: 500 });
    }
}
