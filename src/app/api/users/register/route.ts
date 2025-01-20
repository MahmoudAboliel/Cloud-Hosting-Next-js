import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { registerUserSchema } from "@/utils/validationSchemas";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";

/**
 * @method POST
 * @route  http://localhost:3000/api/users/register
 * @desc   Create New User
 * @access public
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RegisterUserDto;

        const validation = registerUserSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (user)
            return NextResponse.json({message: "This user is already registerd"}, { status: 400 });
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            },
            select: {
                name: true,
                id: true,
                isAdmin: true
            }
        });

        // @Todo -> generate JWT Token
        const JwtPayload:JWTPayload = {
            id: newUser.id,
            isAdmin: newUser.isAdmin,
            name: newUser.name
        } 

        const cookie = setCookie(JwtPayload);
        
        return NextResponse.json(
            {message: "Registered & Authenticated", newUser}, 
            { 
                status: 201,
                headers: { "Set-Cookie": cookie }
            });

    } catch (error) {
        NextResponse.json(error, { status: 500 });
    }
}