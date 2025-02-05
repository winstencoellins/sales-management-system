import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const user = await prisma.user.findMany({
        where: {
            username: 'vinixcollen',
            email: 'vinixcollen@gmail.com',
        },
        select: {
            username: true,
            email: true,
            workOrders: {
                select: {
                    workOrderNumber: true,
                    price: true,
                    status: true
                }
            }
        }
    })

    return NextResponse.json(user)
}

export async function POST(req: NextRequest, res: NextResponse) {
    
}

export async function PUT(req: NextRequest, res: NextResponse) {

}

export async function DELETE(req: NextRequest, res: NextResponse) {

}