import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/dtos";
import { updateCommentSchema } from "@/utils/validationSchemas";

interface Props {
    params: Promise<{ id: string }>
}

/**
 * @method PUT
 * @route  http://localhost:3000/api/comments/:id
 * @desc   Update Single Comment
 * @access private (only owner of the comment)
 */
export async function PUT(request:NextRequest, { params }:Props) {
    try {
        const comment = await prisma.comment.findUnique({ where: {id: (await params).id } });
        if (!comment)
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });

        const user = verifyToken(request);
        if (user === null || user.id !== comment.userId)
            return NextResponse.json({ message: "You are not allowed, access denied" }, { status: 403 });

        const body = await request.json() as UpdateCommentDto;

        const validation = updateCommentSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });

        const updatedComment = await prisma.comment.update({
            where: { id: (await params).id },
            data: { text: body.text }
        });

        return NextResponse.json(updatedComment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

/**
 * @method DELETE
 * @route  http://localhost:3000/api/comments/:id
 * @desc   Delete single Comment
 * @access private (only Admin or owner of the comment)
 */
export async function DELETE(request:NextRequest, { params }:Props) {
    try {
        const comment = await prisma.comment.findUnique({ where: {id: (await params).id } });
        if (!comment)
            return NextResponse.json({ message: "comment not found" }, { status: 404 });

        const user = verifyToken(request);
        if (user === null)
            return NextResponse.json({ message: "No token provided, access denied" }, { status: 401 });

        if (user.isAdmin || user.id === comment.userId) {
            await prisma.comment.delete({ where: { id: (await params).id } });
            return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
        }

        return NextResponse.json(
            { message: "You are not allowed, access denied" },
            { status: 403 }
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}