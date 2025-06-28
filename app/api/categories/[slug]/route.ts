import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    equals: slug,
                    mode: 'insensitive',
                },
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalProducts = await prisma.product.count({
            where: {
                category: {
                    equals: slug,
                    mode: 'insensitive',
                },
            },
        });

        if (totalProducts === 0) {
            // It might be useful to know if the category itself is valid but just has no products.
            // For this simple case, we can just return an empty array.
            return NextResponse.json({
                category: slug,
                products: [],
                totalPages: 0,
                currentPage: page,
            });
        }

        return NextResponse.json({
            category: slug,
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `Failed to fetch products for category: ${slug}` }, { status: 500 });
    }
}
