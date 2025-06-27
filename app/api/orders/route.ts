import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function getUserIdFromToken(req: Request): Promise<string | null> {
    const userPayload = await verifyToken(req);
    return userPayload ? userPayload.userId : null;
}

// GET user's order history
export async function GET(req: Request) {
    try {
        const userId = await getUserIdFromToken(req);
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('[ORDERS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
