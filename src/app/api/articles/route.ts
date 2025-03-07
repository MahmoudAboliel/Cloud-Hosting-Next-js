import {NextRequest, NextResponse} from 'next/server';
import { articleSchema } from '@/utils/validationSchemas';
import { CreateArticleDto } from '@/utils/dtos';
import { Article } from '@prisma/client';
import prisma from '@/utils/db';
import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { verifyToken } from '@/utils/verifyToken';

/**
 * @method GET 
 * @route  http://localhost:3000/api/articles
 * @desc   Get All Articles
 * @access public
 */
export async function GET(request:NextRequest) {
try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    

    const articles = await prisma.article.findMany({
        skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
        take: ARTICLE_PER_PAGE,
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(articles, { status: 200 });
} catch (error) {
    return NextResponse.json({message: error}, {status: 500});
}
}


/**
 * @method POST 
 * @route  http://localhost:3000/api/articles
 * @desc   Create New Article
 * @access private (only admin)
 */
export async function POST(request: NextRequest) {
    try {   
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false)
            return NextResponse.json({ message: "Only Admin, access denied"}, { status: 403 });

        const body = (await request.json()) as CreateArticleDto;

        const validation = articleSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json({message: validation.error.errors[0].message}, { status: 400 });


        const newArticle:Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })
        // console.log(newArticle);
        return NextResponse.json({message: "Created Successfully", newArticle}, { status: 201 });
    }
    catch (error) {
        // console.log(error)
        return NextResponse.json({message: error}, {status: 500});
    }
}