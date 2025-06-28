import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

interface UserPayload {
    userId: string;
    role: string;
    // Add other token payload fields if they exist
}

export async function verifyToken(req: Request): Promise<UserPayload | null> {
    const token = req.headers.get('authorization')?.split(' ')[1]; // Bearer Token

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as unknown as UserPayload;
    } catch (err) {
        console.error('JWT Verification Error:', err);
        return null;
    }
}
