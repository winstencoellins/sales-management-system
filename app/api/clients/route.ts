/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const client = await prisma.client.findMany({
        select: {
            name: true
        }
    })

    return NextResponse.json(client)
}

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [name, address, telephone]: any = [formData.get('clientName'), formData.get('address'), formData.get('tel')]

    const createClient = await prisma.client.create({
        data: {
            name: name,
            address: address,
            telephone: telephone
        }
    })

    return NextResponse.json({  }, { status: 201 })
}

export async function PUT(req: NextRequest, res: NextResponse) {

}

export async function DELETE(req: NextRequest, res: NextResponse) {

}