import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10); // Default to 12 products per page

    const where: any = {};

    if (query) {
        where.name = {
            contains: query,
            mode: 'insensitive',
        };
    }

    if (category) {
        where.category = {
            equals: category,
            mode: 'insensitive',
        };
    }

    try {
        const products = await prisma.product.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalProducts = await prisma.product.count({ where });

        return NextResponse.json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    // TODO: Add admin role verification from JWT token
    try {
        const body = await request.json();
        const {
            name,
            description,
            price,
            originalPrice,
            image,
            images,
            stock,
            category,
        } = body;

        // Basic validation
        if (!name || !description || !price || !image || !stock || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                image,
                images,
                stock: parseInt(stock, 10),
                category,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
