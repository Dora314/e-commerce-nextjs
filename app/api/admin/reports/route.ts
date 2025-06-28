import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

// Type assertion for Prisma reports until types are updated
const prismaReports = (prisma as any).report;

// Default reports that will be created if they don't exist
const defaultReports = [
    {
        name: 'Sales Summary Report',
        description: 'Comprehensive overview of sales performance, trends, and top products',
        type: 'SALES' as const,
        size: '2.4 MB',
    },
    {
        name: 'Inventory Status Report',
        description: 'Current stock levels, low stock alerts, and inventory valuation',
        type: 'INVENTORY' as const,
        size: '1.8 MB',
    },
    {
        name: 'Customer Analytics Report',
        description: 'Customer behavior, demographics, and lifetime value analysis',
        type: 'CUSTOMERS' as const,
        size: '3.1 MB',
    },
    {
        name: 'Financial Overview Report',
        description: 'Revenue, expenses, profit margins, and financial KPIs',
        type: 'FINANCIAL' as const,
        size: '1.5 MB',
    },
    {
        name: 'Product Performance Report',
        description: 'Individual product sales, returns, and profitability analysis',
        type: 'SALES' as const,
        size: '4.2 MB',
    },
    {
        name: 'Tax Report',
        description: 'Tax calculations, exemptions, and compliance documentation',
        type: 'FINANCIAL' as const,
        size: '892 KB',
    },
    {
        name: 'Monthly Sales Report',
        description: 'Detailed monthly sales breakdown by category and region',
        type: 'SALES' as const,
        size: '2.8 MB',
    },
    {
        name: 'Customer Retention Analysis',
        description: 'Customer loyalty metrics and retention strategies',
        type: 'CUSTOMERS' as const,
        size: '1.9 MB',
    },
];

async function ensureDefaultReports() {
    for (const report of defaultReports) {
        const existingReport = await prismaReports.findFirst({
            where: { name: report.name }
        });

        if (!existingReport) {
            await prismaReports.create({
                data: report
            });
        }
    }
}

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // Ensure default reports exist
        await ensureDefaultReports();

        // Get all reports from database
        const reports = await prismaReports.findMany({
            orderBy: {
                lastGenerated: 'desc'
            }
        });

        // Format reports for frontend
        const formattedReports = reports.map((report: any) => ({
            id: report.id,
            name: report.name,
            description: report.description,
            type: report.type.toLowerCase(),
            lastGenerated: report.lastGenerated.toISOString().split('T')[0],
            size: report.size,
            status: report.status.toLowerCase(),
        }));

        return NextResponse.json(formattedReports);
    } catch (error) {
        console.error('[ADMIN_REPORTS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, description, type } = body;

        if (!name || !description || !type) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const report = await prismaReports.create({
            data: {
                name,
                description,
                type: type.toUpperCase(),
                size: '0 KB', // Will be updated when report is generated
                status: 'GENERATING'
            }
        });

        return NextResponse.json(report);
    } catch (error) {
        console.error('[ADMIN_REPORTS_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
