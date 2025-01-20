import Jwt from 'jsonwebtoken';
import { JWTPayload } from './types';
import { serialize } from 'cookie';

// Generate JWT Token
export function generateJWT(payload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;
    const token = Jwt.sign(
        payload, 
        privateKey, 
        { expiresIn: '30d' }
    );
    return token;
}

// Set Cookie with JWT
export function setCookie(payload: JWTPayload): string {
    const token = generateJWT(payload);
    const cookie = serialize("jwtToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });

    return cookie;
}