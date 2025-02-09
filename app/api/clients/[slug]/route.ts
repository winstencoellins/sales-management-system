import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const data = req.url

    const clientId = data.split('/')[5]

    const client = await prisma.client.findFirst({
        where: {
            id: clientId
        }
    })

    if (client) {
        return NextResponse.json({ success: true, client }, { status: 200 })
    }

    return NextResponse.json({ success: false, message: 'Client not found.' }, { status: 404 })
}