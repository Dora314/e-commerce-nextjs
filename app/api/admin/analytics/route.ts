import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import { Role, PaymentStatus } from '@prisma/client';

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // Get basic analytics data
        const [
            totalRevenueData,
            totalOrders,
            totalCustomers,
            totalProducts,
            lowStockProducts,
            recentOrders
        ] = await Promise.all([
            prisma.order.aggregate({
                _sum: { total: true },
                where: { paymentStatus: PaymentStatus.PAID }
            }),
            prisma.order.count(),
            prisma.user.count({ where: { role: Role.CUSTOMER } }),
            prisma.product.count(),
            prisma.product.count({
                where: { stock: { lte: 10 } }
            }),
            prisma.order.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, email: true } },
                    items: { include: { product: { select: { name: true } } } }
                }
            })
        ]);

        const analytics = {
            overview: {
                totalRevenue: totalRevenueData._sum.total || 0,
                totalOrders,
                totalCustomers,
                totalProducts,
                lowStockAlerts: lowStockProducts
            },
            recentOrders: recentOrders.map(order => ({
                id: order.id,
                customer: order.user?.name || 'Unknown',
                email: order.user?.email || '',
                total: order.total,
                status: order.status.toLowerCase(),
                date: order.createdAt.toISOString().split('T')[0],
                items: order.items.length
            }))
        };

        return NextResponse.json(analytics);
    } catch (error) {
        console.error('[ADMIN_ANALYTICS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
