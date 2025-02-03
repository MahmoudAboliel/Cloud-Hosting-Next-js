import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

/**
 * @method GET
 * @route  http:localhost:3000/api/users/logout
 * @desc   Logout User
 * @access private
 */
export async function GET() {
    try {
        (await cookies()).delete("jwtToken");
        return NextResponse.json({ message: "Logout"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error}, { status: 500 });
    }
}