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
        const users = await prisma.user.findMany({
            include: {
                orders: true,
            },
        });

        const customers = users.map(user => {
            const totalOrders = user.orders.length;
            const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);
            const lastOrder = totalOrders > 0 ? user.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt : null;

            let status: 'active' | 'inactive' | 'vip' | 'new' = 'new';
            if (totalOrders > 10 || totalSpent > 1000) {
                status = 'vip';
            } else if (totalOrders > 0) {
                status = 'active';
            } else if (lastOrder && new Date().getTime() - new Date(lastOrder).getTime() > 365 * 24 * 60 * 60 * 1000) {
                status = 'inactive';
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: 'N/A', // Not in User model
                address: 'N/A', // Not in User model
                joinDate: user.createdAt.toISOString().split('T')[0],
                totalOrders: totalOrders,
                totalSpent: totalSpent,
                lastOrder: lastOrder ? lastOrder.toISOString().split('T')[0] : 'N/A',
                status: status,
                avatar: `https://i.pravatar.cc/150?u=${user.email}`,
            };
        });

        return NextResponse.json(customers);
    } catch (error) {
        console.error('[ADMIN_CUSTOMERS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
