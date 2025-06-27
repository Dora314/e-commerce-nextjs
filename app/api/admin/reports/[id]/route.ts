import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

// Type assertion for Prisma reports until types are updated
const prismaReports = (prisma as any).report;

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const report = await prismaReports.findUnique({
            where: { id: params.id }
        });

        if (!report) {
            return new NextResponse('Report not found', { status: 404 });
        }

        const formattedReport = {
            id: report.id,
            name: report.name,
            description: report.description,
            type: report.type.toLowerCase(),
            lastGenerated: report.lastGenerated.toISOString().split('T')[0],
            size: report.size,
            status: report.status.toLowerCase(),
            filePath: report.filePath,
        };

        return NextResponse.json(formattedReport);
    } catch (error) {
        console.error('[ADMIN_REPORT_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, description, status } = body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (status) updateData.status = status.toUpperCase();

        const updatedReport = await prismaReports.update({
            where: { id: params.id },
            data: updateData
        });

        return NextResponse.json(updatedReport);
    } catch (error) {
        console.error('[ADMIN_REPORT_PUT]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        await prismaReports.delete({
            where: { id: params.id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('[ADMIN_REPORT_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

// Generate report (simulate report generation)
export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const report = await prismaReports.findUnique({
            where: { id: params.id }
        });

        if (!report) {
            return new NextResponse('Report not found', { status: 404 });
        }

        // Update report status to generating
        await prismaReports.update({
            where: { id: params.id },
            data: {
                status: 'GENERATING',
                lastGenerated: new Date()
            }
        });

        // Simulate report generation (in real app, this would be a background job)
        setTimeout(async () => {
            try {
                await prismaReports.update({
                    where: { id: params.id },
                    data: {
                        status: 'READY',
                        size: `${Math.random() * 5 + 1}${Math.random() > 0.5 ? ' MB' : ' KB'}`,
                        filePath: `/reports/${params.id}_${Date.now()}.pdf`
                    }
                });
            } catch (error) {
                console.error('Error updating report status:', error);
            }
        }, 3000);

        return NextResponse.json({ message: 'Report generation started' });
    } catch (error) {
        console.error('[ADMIN_REPORT_GENERATE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
