import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for');

    if(ip){
        return NextResponse.json({
            status: "OK",
            ip: ip.startsWith('::ffff:') ? ip.slice(7) : ip
        })
    }

    return NextResponse.json({
        status: "Error",
        message: "An unknown error occurred"
    }, {
        status: 500
    })
}