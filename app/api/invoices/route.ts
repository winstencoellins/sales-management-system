/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const invoice = await prisma.invoices.findMany({
        where: {
            invoiceNumber: 'A0001',
            status: 'UNPAID'
        },
        select: {
            invoiceNumber: true,
            status: true,
            workOrder: {
                select: {
                    workOrderNumber: true
                }
            }
        }
    })

    return NextResponse.json(invoice, {status: 200})
}

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [invoiceNumber, workOrderId]:any = [formData.get('invoiceNumber'), formData.get('workOrderId')]

    const invoice = await prisma.invoices.findFirst({
        where: {
            invoiceNumber: invoiceNumber
        }
    })

    console.log(invoiceNumber, typeof(workOrderId))

    if (invoice){
        return NextResponse.json({}, {status: 409})
    }

    const createInvoice = await prisma.invoices.create({
        data: {
            invoiceNumber: invoiceNumber,
            workOrderId: parseInt(workOrderId)
        }
    })

    console.log(createInvoice)

    // console.log(workOrderNumber)
    return NextResponse.json({ success: true, message: `Invoice #${invoiceNumber} has been created` })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [invoiceNumber, status, workOrderId]:any = [formData.get('invoiceNumber'), formData.get('status'), formData.get('workOrderId')]

    // console.log(invoiceNumber, status, workOrderId)

    const updateInvoice = await prisma.invoices.update({
        where: {
            invoiceNumber: invoiceNumber,
        },
        data: {
            status: status
        }
    })

    return NextResponse.json({success: true, message: `Invoice ${invoiceNumber} has been updated`})
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const invoiceNumber:any = formData.get('invoiceNumber')

    console.log(invoiceNumber)

    const deleteInvoice = await prisma.invoices.delete({
        where: {
            invoiceNumber: invoiceNumber
        }
    })

    console.log(deleteInvoice)

    return NextResponse.json({ success: true, message: `Invoice #${invoiceNumber} deleted successfully.`})
}