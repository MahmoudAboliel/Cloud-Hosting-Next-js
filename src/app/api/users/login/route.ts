import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { LoginUserDto } from '@/utils/dtos';
import { loginUserSchema } from '@/utils/validationSchemas';
import { setCookie } from '@/utils/generateToken';
import { JWTPayload } from '@/utils/types';

/**
 * @method POST
 * @route  http://localhost:3000/api/users/login
 * @desc   Login User
 * @access public
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginUserDto;

        const validation = loginUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }
        
        const user = await prisma.user.findUnique({ where: { email: body.email }});
        if (!user) {
            return NextResponse.json(
                { message: "Email or Password is Invalid" },
                { status: 400 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Email or Password is Invalid" },
                { status: 400 }
            );
        }

        // @Todo -> generate JWT Token
        const jwtPayload:JWTPayload = {
            id: user.id,
            isAdmin: user.isAdmin,
            name: user.name
        };

        // moved to generate Token file
        // const token = generateJWT(jwtPayload);
        // const cookie = serialize("jwtToken", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     path: '/',
        //     maxAge: 60 * 60 * 24 * 30, // 30 days
        // });

        const cookie = setCookie(jwtPayload);

        return NextResponse.json(
            { message: "Authenticated" },
            { 
                status: 200,
                headers: { "Set-Cookie": cookie }
             }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}