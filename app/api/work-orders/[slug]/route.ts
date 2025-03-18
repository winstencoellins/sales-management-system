import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const workOrderId = req.url.split('/')[5]

    console.log(workOrderId)

    const workOrderDetail = await prisma.workOrder.findUnique({
        omit: {
            id: true,
        },
        where: {
            id: parseInt(workOrderId)
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

    console.log(workOrderDetail)

    return NextResponse.json(workOrderDetail, { status: 200 })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const workOrderId = req.url.split('/')[5]
    const data = await req.json()

    const updateWorkOrderStatus = await prisma.workOrder.update({
        where: {
            id: parseInt(workOrderId)
        },
        data: {
            status: data.status
        }
    })


    return NextResponse.json({success: true, message: "Status updated successfully!"}, { status: 201 })

}