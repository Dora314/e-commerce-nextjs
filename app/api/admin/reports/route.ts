import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const availableReports = [
    {
        id: 'sales-summary',
        name: 'Sales Summary Report',
        description:
            'Comprehensive overview of sales performance, trends, and top products',
        type: 'sales',
        lastGenerated: '2024-01-20',
        size: '2.4 MB',
        status: 'ready',
    },
    {
        id: 'inventory-status',
        name: 'Inventory Status Report',
        description:
            'Current stock levels, low stock alerts, and inventory valuation',
        type: 'inventory',
        lastGenerated: '2024-01-19',
        size: '1.8 MB',
        status: 'ready',
    },
    {
        id: 'customer-analytics',
        name: 'Customer Analytics Report',
        description:
            'Customer behavior, demographics, and lifetime value analysis',
        type: 'customers',
        lastGenerated: '2024-01-18',
        size: '3.1 MB',
        status: 'ready',
    },
    {
        id: 'financial-overview',
        name: 'Financial Overview Report',
        description:
            'Revenue, expenses, profit margins, and financial KPIs',
        type: 'financial',
        lastGenerated: '2024-01-17',
        size: '1.5 MB',
        status: 'ready',
    },
    {
        id: 'product-performance',
        name: 'Product Performance Report',
        description:
            'Individual product sales, returns, and profitability analysis',
        type: 'sales',
        lastGenerated: '2024-01-16',
        size: '4.2 MB',
        status: 'generating',
    },
    {
        id: 'tax-report',
        name: 'Tax Report',
        description:
            'Tax calculations, exemptions, and compliance documentation',
        type: 'financial',
        lastGenerated: '2024-01-15',
        size: '892 KB',
        status: 'ready',
    },
];

export async function GET() {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // In a real application, you would generate these reports on the fly
    // or retrieve them from a storage service.
    return NextResponse.json(availableReports);
}
