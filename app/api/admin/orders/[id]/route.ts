import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

// const prisma = new PrismaClient();

// UPDATE an order's status (for admin)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    // Note: Middleware should have already verified admin role.
    const { id } = params;

    try {
        const { status } = await request.json();

        // Validate the status
        if (!status || !Object.values(OrderStatus).includes(status as OrderStatus)) {
            return NextResponse.json({ error: 'Invalid status provided' }, { status: 400 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status: status as OrderStatus },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error(`Failed to update order ${id}:`, error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
