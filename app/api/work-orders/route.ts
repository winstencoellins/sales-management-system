/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    const workOrders = await prisma.workOrder.findMany({
        select: {
            workOrderNumber: true,
            furnitureSize: true,
            estimatedFinishDate: true,
            price: true,
            status: true,
            client: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            estimatedFinishDate: 'asc'
        }
    })

    return NextResponse.json(workOrders, { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [workOrderNumber, furnitureSize, estimatedFinishDate, price, client, qty, worker, productDescription, notes]:any = [formData.get('workOrderNumber'), formData.get('furnitureSize'), formData.get('estimatedFinishDate'), formData.get('price'), formData.get('client'), formData.get('worker'), formData.get('qty'), formData.get('productDescription'), formData.get('notes')]

    console.log(qty, worker, productDescription, notes)

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

    // const userId: any = await prisma.user.findFirst({
    //     where: {
    //         id: 'ccd9a3d4-d7a5-4398-a74d-d8e9e34165eb'
    //     },
    //     select: {
    //         id: true
    //     }
    // })

    const createWorkOrder = await prisma.workOrder.create({
        data: {
            workOrderNumber: workOrderNumber,
            furnitureSize: furnitureSize,
            estimatedFinishDate: estimatedFinishDate + 'T00:00:00.000Z',
            price: parseInt(price),
            clientId: clientId.id,
            worker: worker,
            productDescription: productDescription,
            notes: notes,
            quantity: parseInt(qty)
            // userId: userId.id,
        }
    })

    return NextResponse.json({ success: true, message: `Work Order #${workOrderNumber} created successfully.` }, { status: 201 })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [workOrderNumber, furnitureSize, estimatedFinishDate, price, status, clientId]:any = [formData.get('workOrderNumber'), formData.get('furnitureSize'), formData.get('estimatedFinishDate'), formData.get('price'), formData.get('status'), formData.get('clientId')]

    console.log(workOrderNumber, furnitureSize, estimatedFinishDate, price, status, clientId)

    const updateWorkOrder = await prisma.workOrder.update({
        where: {
            workOrderNumber: workOrderNumber
        },
        data: {
            furnitureSize: furnitureSize,
            estimatedFinishDate: estimatedFinishDate + 'T00:00:00.000Z',
            price: parseInt(price),
            status: status,
            clientId: clientId.id // BINGUNG WOEOSKLDLFJLKASDJFLKASJLDFK
        }
    })

    console.log(updateWorkOrder)

    return NextResponse.json({ success: true, message: `Work Order #${workOrderNumber} updated successfully`})
}

export async function DELETE(req: NextRequest, res: NextResponse){
    const formData = await req.formData()

    const workOrderNumber:any = formData.get('workOrderNumber')
}