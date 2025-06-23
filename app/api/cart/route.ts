import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET user's cart
export async function GET(request: Request) {
    const userPayload = await verifyToken(request);
    if (!userPayload) {
        // Return empty array if not authorized, client will handle it.
        return NextResponse.json([], { status: 401 });
    }
    const { userId } = userPayload;

    try {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true, // Include product details for each cart item
                    },
                },
            },
        });

        if (!cart) {
            // If user has no cart yet, return an empty array
            return NextResponse.json([]);
        }

        return NextResponse.json(cart.items);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
    }
}

// ADD item to cart or UPDATE quantity
export async function POST(request: Request) {
    const userPayload = await verifyToken(request);
    if (!userPayload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = userPayload;

    try {
        const { productId, quantity } = await request.json();
        if (!productId || !quantity || quantity < 1) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // Verify that the product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Find user's cart, or create one if it doesn't exist
        let cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await prisma.cart.create({ data: { userId } });
        }

        // Check if the product is already in the cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        });

        let updatedItem;
        if (existingItem) {
            // If item exists, update its quantity
            updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
                include: { product: true },
            });
        } else {
            // If item does not exist, create a new cart item
            updatedItem = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    quantity: quantity,
                },
                include: { product: true },
            });
        }

        return NextResponse.json(updatedItem, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
    }
}

// UPDATE item quantity in cart
export async function PUT(request: Request) {
    const userPayload = await verifyToken(request);
    if (!userPayload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = userPayload;

    try {
        const { cartItemId, quantity } = await request.json();
        if (!cartItemId || quantity < 1) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // Security check: Ensure the item belongs to the user's cart
        const itemToUpdate = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            select: { cart: { select: { userId: true } } }
        });

        if (!itemToUpdate || itemToUpdate.cart.userId !== userId) {
            return NextResponse.json({ error: 'Item not found or unauthorized' }, { status: 404 });
        }

        const updatedItem = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
            include: { product: true },
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
    }
}

// DELETE item from cart
export async function DELETE(request: Request) {
    const userPayload = await verifyToken(request);
    if (!userPayload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { userId } = userPayload;

    try {
        const { cartItemId } = await request.json();
        if (!cartItemId) {
            return NextResponse.json({ error: 'Cart item ID is required' }, { status: 400 });
        }

        // Security check: Ensure the item belongs to the user's cart
        const itemToDelete = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            select: { cart: { select: { userId: true } } }
        });

        if (!itemToDelete || itemToDelete.cart.userId !== userId) {
            return NextResponse.json({ error: 'Item not found or unauthorized' }, { status: 404 });
        }

        await prisma.cartItem.delete({ where: { id: cartItemId } });

        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete cart item' }, { status: 500 });
    }
}
