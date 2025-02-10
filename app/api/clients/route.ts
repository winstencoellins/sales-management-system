/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const client = await prisma.client.findMany({
        select: {
            id: true,
            name: true,
            address: true,
            telephone: true,
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

    return NextResponse.json({ success: true, message: `Client ${name} created successfully` }, { status: 201 })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const formData = await req.formData()

    const [id, name, address, telephone]:any = [formData.get('id'), formData.get('clientName'), formData.get('address'), formData.get('tel')]

    console.log(name, address, telephone)

    const updateClient = await prisma.client.update({
        where: {
            id: id
        },
        data: {
            name: name,
            address: address,
            telephone: telephone
        }
    })

    // console.log(updateClient)

    return NextResponse.json({success: true, message: `Client ${name} updated successfully`})
}

// export async function DELETE(req: NextRequest, res: NextResponse) {
//     const formData = await req.formData()

//     const [id, clientName]:any = [formData.get('id'), formData.get('clientName')]

//     console.log(id, clientName)

//     // if the client is still connected to a work order
//     if () {
//         return NextResponse.json({status: 409, message: `Client ${clientName} is still connected to work order.`})
//     }

//     // INTERNAL SERVER ERROR WOEEE :'D
//     const deleteClient = await prisma.client.delete({
//         where: {
//             id: id
//         }
//     })

//     console.log(deleteClient)

//     return NextResponse.json({ success: true, message: `Client ${clientName} deleted successfully.`})
// }