import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { OrderStatus, Role, PaymentStatus } from '@prisma/client'; // Import enums

export async function GET(req: Request) {
    try {
        // These promises can be run in parallel for better performance
        const [totalRevenueData, totalOrders, totalCustomers, totalProducts, recentOrders] = await Promise.all([
            prisma.order.aggregate({
                _sum: {
                    total: true,
                },
                where: {
                    paymentStatus: PaymentStatus.PAID
                },
            }),
            prisma.order.count(),
            prisma.user.count({
                where: {
                    role: Role.CUSTOMER,
                },
            }),
            prisma.product.count(),
            prisma.order.findMany({
                take: 5,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                        }
                    }
                }
            })
        ]);

        const stats = {
            totalRevenue: totalRevenueData._sum.total || 0,
            totalOrders,
            totalCustomers,
            totalProducts,
            recentOrders,
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('[ADMIN_ANALYTICS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
