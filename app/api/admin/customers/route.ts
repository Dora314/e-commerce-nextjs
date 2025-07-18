import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const payload = await verifyToken(req);
    if (!payload || payload.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // Derive customers from orders data
        // Fetch orders with related user to get customer info
        const orders = await prisma.order.findMany({
            include: { user: true }
        });
        const custMap: Record<string, any> = {};
        orders.forEach(order => {
            const user = order.user;
            const key = user.email;
            if (!custMap[key]) {
                custMap[key] = {
                    id: user.id,
                    name: user.name || 'Unknown',
                    email: user.email,
                    phone: (user as any).phone || 'N/A',
                    address: order.shippingAddressJson || 'N/A',
                    joinDate: user.createdAt.toISOString().split('T')[0],
                    orders: [] as typeof order[],
                };
            }
            custMap[key].orders.push(order);
        });
        const customers = Object.values(custMap).map((cust: any) => {
            const totalOrders = cust.orders.length;
            const totalSpent = cust.orders.reduce((sum: number, o: any) => sum + o.total, 0);
            const lastOrderDate = cust.orders
                .map((o: any) => o.createdAt)
                .sort((a: Date, b: Date) => new Date(b).getTime() - new Date(a).getTime())[0];
            let status: 'active' | 'inactive' | 'vip' | 'new' = 'new';
            if (totalOrders > 10 || totalSpent > 1000) status = 'vip';
            else if (totalOrders > 0) status = 'active';
            else if (lastOrderDate && Date.now() - new Date(lastOrderDate).getTime() > 365*24*60*60*1000) status = 'inactive';
            return {
                id: cust.id,
                name: cust.name,
                email: cust.email,
                phone: cust.phone,
                address: cust.address,
                joinDate: cust.joinDate,
                totalOrders,
                totalSpent,
                lastOrder: lastOrderDate ? new Date(lastOrderDate).toISOString().split('T')[0] : 'N/A',
                status,
                avatar: `https://i.pravatar.cc/150?u=${cust.email}`,
            };
        });

        return NextResponse.json(customers);
    } catch (error) {
        console.error('[ADMIN_CUSTOMERS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
