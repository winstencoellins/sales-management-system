/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    const workOrders = await prisma.workOrder.findMany({
        select: {
            workOrderNumber: true,
            estimatedFinishDate: true,
            price: true,
            status: true,
            worker: true,
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
    
    const workOrderNumber = `${formData.get('order')}/${formData.get('month')}/${formData.get('year')}`
    
    const existingWorkOrder = await prisma.workOrder.findFirst({
        where: {
            workOrderNumber: workOrderNumber
        }
    })

    if (existingWorkOrder != null) {
        return NextResponse.json({ success: false }, { status: 409 })
    }

    const [worker, date, notes, client, itemDescription, quantity, price]: any = [formData.get('worker'), formData.get('date'), formData.get('notes'), formData.get('client'), formData.get('itemDescription'), formData.get('quantity'), formData.get('price')]

    const clientId: any = await prisma.client.findFirst({
        where: {
            name: client
        }
    })

    console.log(workOrderNumber, date, price, worker, quantity, notes, itemDescription)

    const createWorkOrder = await prisma.workOrder.create({
        data: {
            workOrderNumber: workOrderNumber,
            estimatedFinishDate: date + 'T00:00:00.000Z',
            price: parseInt(price),
            worker: worker,
            quantity: parseInt(quantity),
            notes: notes,
            clientId: clientId.id,
            itemDescription: itemDescription
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