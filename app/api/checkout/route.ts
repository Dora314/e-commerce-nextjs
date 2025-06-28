import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for the request body
const checkoutSchema = z.object({
    shippingAddress: z.object({
        fullName: z.string().min(1, "Full name is required"),
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zipCode: z.string().min(1, "Zip code is required"),
        country: z.string().min(1, "Country is required"),
        phone: z.string().min(1, "Phone number is required"),
    }),
    shippingMethod: z.string().min(1, "Shipping method is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
});

interface JwtPayload {
    userId: string;
}

export async function POST(req: NextRequest) {
    try {
        const userPayload = await verifyToken(req);
        if (!userPayload) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const userId = userPayload.userId;

        const body = await req.json();
        const validation = checkoutSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: 'Invalid input', details: validation.error.flatten() }, { status: 400 });
        }

        const { shippingAddress, shippingMethod, paymentMethod } = validation.data;

        // 1. Get user's cart
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    }
                }
            }
        });


        if (!cart || cart.items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }
        const cartItems = cart.items;

        // 2. Calculate total price and check stock
        let totalPrice = 0;
        for (const item of cartItems) {
            if (item.quantity > item.product.stock) {
                return NextResponse.json({ error: `Not enough stock for ${item.product.name}` }, { status: 400 });
            }
            totalPrice += item.product.price * item.quantity;
        }

        // For simplicity, let's assume a fixed shipping cost for now
        const shippingCost = shippingMethod === 'Express' ? 20.00 : 10.00;
        const finalTotal = totalPrice + shippingCost;

        // 3. Use a transaction to ensure all operations succeed or none do
        const order = await prisma.$transaction(async (tx) => {
            // a. Create the Order
            const newOrder = await tx.order.create({
                data: {
                    user: { connect: { id: userId } },
                    total: finalTotal,
                    status: 'PENDING', // Initial status
                    shippingAddressJson: JSON.stringify(shippingAddress),
                    shippingMethod: shippingMethod,
                    shippingCost: shippingCost,
                    paymentMethod: paymentMethod,
                    paymentStatus: 'PENDING',
                    items: {
                        create: cartItems.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price, // Store price at time of purchase
                        })),
                    },
                },
                include: {
                    items: true,
                },
            });

            // b. Update product stock
            for (const item of cartItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            // c. Clear the user's cart
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });

            return newOrder;
        });

        // 4. Return the created order
        return NextResponse.json(order, { status: 201 });

    } catch (error) {
        console.error('Checkout error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid input', details: error.flatten() }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
