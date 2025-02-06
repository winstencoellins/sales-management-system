/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [workOrderNumber, furnitureSize, estimatedFinishDate, price, client]:any = [formData.get('workOrderNumber'), formData.get('furnitureSize'), formData.get('estimatedFinishDate'), formData.get('price'), formData.get('client')]

    console.log(estimatedFinishDate, workOrderNumber, furnitureSize, price, client)

    const workOrder = await prisma.workOrder.findFirst({
        where: {
            workOrderNumber: workOrderNumber
        }
    })

    if (workOrder) {
        return NextResponse.json({}, { status: 409 })
    }

    const clientId: any = await prisma.client.findFirst({
        where: {
            name: client
        },
        select: {
            id: true
        }
    })

    console.log(clientId.id)

    const userId: any = await prisma.user.findFirst({
        where: {
            id: 'ccd9a3d4-d7a5-4398-a74d-d8e9e34165eb'
        },
        select: {
            id: true
        }
    })

    console.log(userId.id)

    const createWorkOrder = await prisma.workOrder.create({
        data: {
            workOrderNumber: workOrderNumber,
            furnitureSize: furnitureSize,
            estimatedFinishDate: estimatedFinishDate + 'T00:00:00.000Z',
            price: parseInt(price),
            clientId: clientId.id,
            // userId: userId.id,
        }
    })

    return NextResponse.json({ message: 'Work Order created successfully.' }, { status: 201 })
}