import Jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { JWTPayload } from './types';

// verify token for api endpoint
export function verifyToken(request: NextRequest): JWTPayload | null {
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string;
        if (!token) return null
    
        const privateKey = process.env.JWT_SECRET as string;
        const userPayload = Jwt.verify(token, privateKey) as JWTPayload;
    
        return userPayload;
    } catch {
        return null;
    }
}

// verify token for page
export function verifyTokenPage(token:string): JWTPayload | null {
    try {
        const parivateKey = process.env.JWT_SECRET as string;
        const userPayload = Jwt.verify(token, parivateKey) as JWTPayload;
        
        if (!userPayload) return null;

        return userPayload;
    } catch {
        return null;
    }
}