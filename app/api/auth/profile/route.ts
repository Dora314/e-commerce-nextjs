import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const payload = await verifyToken(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, role: true }
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const payload = await verifyToken(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();
  const updatedUser = await prisma.user.update({
    where: { id: payload.userId },
    data: {
      name: data.name,
      email: data.email
    },
    select: { id: true, name: true, email: true, role: true }
  });
  return NextResponse.json(updatedUser);
}
