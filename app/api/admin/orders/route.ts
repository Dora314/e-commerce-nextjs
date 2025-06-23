import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

// const prisma = new PrismaClient();

// GET all orders (for admin)
export async function GET(request: Request) {
    // Note: Middleware should have already verified admin role.

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as OrderStatus | null;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const where: any = {};
    if (status) {
        where.status = status;
    }

    try {
        const orders = await prisma.order.findMany({
            where,
            include: {
                user: {
                    select: { id: true, name: true, email: true }, // Avoid sending user password
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalOrders = await prisma.order.count({ where });

        return NextResponse.json({
            orders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
