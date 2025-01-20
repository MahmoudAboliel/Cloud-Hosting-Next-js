import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 * @method GET
 * @route  http:localhost:3000/api/articles/count
 * @desc   Get Number of Articles
 * @access public
 */
export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}