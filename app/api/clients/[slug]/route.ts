import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const data = req.url

    const clientId = data.split('/')[5]

    const client = await prisma.client.findFirst({
        omit: {
            id: true
        },
        where: {
            id: clientId
        }
    })

    if (client) {
        return NextResponse.json({ success: true, client }, { status: 200 })
    }

    return NextResponse.json({ success: false, message: 'Client not found.' }, { status: 404 })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const data = req.url
    const formData = await req.formData()

    const [name, address, telephone]: [any, any, any] = [formData.get('clientName'), formData.get('address'), formData.get('tel')]

    const clientId = data.split('/')[5]

    const client = await prisma.client.findFirst({
        where: {
            id: clientId
        }
    })

    if (client) {
        const updateClient = await prisma.client.update({
            where: {
                id: clientId
            },
            data: {
                name: name,
                address: address,
                telephone: telephone
            }
        })

        return NextResponse.json({ success: true, message: 'Client updated successfully!' }, { status: 201 })
    }

    return NextResponse.json({ success: false, message: 'Client not found.' }, { status: 404 })
}

export async function POST(req: NextRequest, res: NextResponse) {
    const [data, url] = [await req.json(), req.url]

    const clientId = url.split('/')[5]

    console.log(data.active)

    if (data.active) {
        const deactivateClient = await prisma.client.update({
            where: {
                id: clientId
            },
            data: {
                status: 'INACTIVE'
            }
        })

        return NextResponse.json({ success: true, message: 'Client has been deactivated.' }, { status: 201 })
    }

    const activateClient = await prisma.client.update({
        where: {
            id: clientId
        },
        data: {
            status: 'ACTIVE'
        }
    })

    return NextResponse.json({ success: true, message: 'Client has been activated' }, { status: 201 })
}
