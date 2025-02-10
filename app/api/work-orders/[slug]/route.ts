import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const workOrderNumber = req.url.split('/')[5]

    const workOrderDetail = await prisma.workOrder.findFirst({
        omit: {
            id: true,
        },
        where: {
            workOrderNumber: workOrderNumber
        },
        include: {
            client: {
                omit: {
                    id: true
                }
            }
        }
    })

    if (!workOrderDetail) {
        return NextResponse.json({ success: true, message: 'Work Order doesn\'t exist' }, { status: 404 })
    }

    return NextResponse.json(workOrderDetail, { status: 200 })
}