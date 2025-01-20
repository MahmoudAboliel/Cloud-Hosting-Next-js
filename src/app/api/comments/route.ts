import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchemas";

/**
 * @method POST
 * @route  http://localhost:3000/api/comments
 * @desc   Create New Comment
 * @access private
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (!user) 
            return NextResponse.json( { message: "Only logged in user, access denied" }, { status: 401 });

        const body = await request.json() as CreateCommentDto;
        
        const validation = createCommentSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id,

            }
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

/**
 * @method GET
 * @route  http://localhost:3000/api/comments
 * @desc   Get All Comments
 * @access private Only Admin
 */
export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false)
            return NextResponse.json({ message: "Only Admin, access denied" }, { status: 403 });

        const comments = await prisma.comment.findMany();
        
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}