import { NextRequest, NextResponse } from 'next/server';
import { UpdateArticleDto } from '@/utils/dtos';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';



interface Props {
    params: Promise<{ id: string }>
}

/**
 * @method GET 
 * @route  http://localhost:3000/api/articles/:id
 * @desc   Get Single Article
 * @access public
 */
export async function GET(request: NextRequest, { params }:Props) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: (await params).id },
            include: {
                comments: {
                    include: { 
                        user: {
                            select: {
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
        });

        if (!article) 
            return NextResponse.json({ message: "Article Not Found" } , { status: 404 });

        return NextResponse.json(article, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}


/**
 * @method  put 
 * @route  http://localhost:3000/api/articles/:id
 * @desc   Update Single Article
 * @access private (only admin)
 */
export async function PUT(request: NextRequest, { params }:Props) {
    try {
        const user = verifyToken(request);
                if (user === null || user.isAdmin === false)
                    return NextResponse.json({ message: "Only Admin, access denied"}, { status: 403 });
        
        const article = await prisma.article.findUnique({
            where: { id: (await params).id },
        });
    if (!article)
        return NextResponse.json({message: "Article Not Found"}, { status: 404 });

    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
        where: { id: (await params).id},
        data: {
            title: body.title,
            description: body.description
        }
    })
    
    return NextResponse.json({message: "Article Updated", updatedArticle}, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({message: error}, {status: 500});
    }   
}


/**
 * @method DELETE 
 * @route  http://localhost:3000/api/articles/:id
 * @desc   Delete Single Article
 * @access private (only admin)
 */
export async function DELETE(request: NextRequest, { params }:Props) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false)
            return NextResponse.json({ message: "Only Admin, access denied"}, { status: 403 });

        const article = await prisma.article.findUnique({
            where: {
                id: (await params).id
            }
        });
    if (!article)
        return NextResponse.json({message: "Article Not Found"}, { status: 404 });

    await prisma.article.delete({
        where: {
            id: (await params).id
        }
    });
    
    return NextResponse.json({message: "Article Deleted"}, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({message: error}, {status: 500});
    }   
}