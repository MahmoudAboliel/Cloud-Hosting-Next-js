import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from 'bcryptjs';
import { updateUserSchema } from "@/utils/validationSchemas";

interface Props {
    params: Promise<{ id: string }>
}

/**
 * @method DELETE
 * @route  http://localhost:3000/api/users/profile/:id
 * @desc   Delete Profile
 * @access private
 */
export async function DELETE(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: (await params).id }});
        if (!user)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        // replace with cookie
        // const authToken = request.headers.get('authToken') as string;

        // moved to middleware file
        // if (!authToken) {
        //     return NextResponse.json(
        //         { message: "Not token provided, access denied"},
        //         { status: 401 } // Unauthorized
        //     );
        // }

        
        const userFromToken = verifyToken(request);
        if (userFromToken !== null && userFromToken.id === user.id) {
            await prisma.user.delete({ where: {id: (await params).id }});
    
            return NextResponse.json(
                { message: "Your profile has been deleted" }, 
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "Only user himself can delete his profile, forbidden"},
            { status: 403 } // forbidden
        );


    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

/**
 * @method GET
 * @route  http:localhost:3000/api/users/profile/:id
 * @desc   Get User Profile
 * @access private
 */
export async function GET(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ 
            where: { id: (await params).id },
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
                createdAt: true
            }
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json({ message: "You are not allowed, access denied"}, { status: 403 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error}, { status: 500 });
    }
}

/**
 * @method PUT
 * @route  http:localhost:3000/api/users/profile/:id
 * @desc   Update User Profile
 * @access private
 */
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: (await params).id } });
        if (!user)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        const userFromToken = verifyToken(request);
        if (userFromToken === null || userFromToken.id !== user.id)
            return NextResponse.json({message: "You are not allowed, access denied" }, { status: 403 });

        const body = await request.json() as UpdateUserDto;

        const validation = updateUserSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        if (body.password) {

            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt)
        }

        const updatedUser = await prisma.user.update({
            where: { id: (await params).id },
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}