/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Form } from "@heroui/form"
import { Input } from "@heroui/input"

import Image from "next/image"
import Link from "next/link"

import leftArrow from '@/public/left-arrow.svg'

import { FormEvent, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function EditClient() {
    const path = usePathname()

    console.log(path)
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [clientName, setClientName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [tel, setTel] = useState<string>('')

    useEffect(() => {
        getClientDetail()
    }, [])

    const onSubmit = async () => {

    }

    const getClientDetail = async () => {
        console.log(path.split('/'))

        const response = await fetch(`/api/clients/${path.split('/')[3]}`, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error('Failed to connect to database. Please try again')
        }

        const data = await response.json()

        if (data.success) {
            setClientName(data.client.name)
            setAddress(data.client.address)
            setTel(data.client.telephone)
        }
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Work Order</h1>

                    <Link href='/dashboard/clients' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={leftArrow} alt={'plus'} width={20} height={20} className='mr-2' /> Back to Clients</Link>
                </div>

            </header>


            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <Input
                        isRequired
                        label="Client Name"
                        labelPlacement="outside"
                        placeholder="Apple Inc."
                        name="clientName"
                        className="lg:my-1"
                        value={clientName}
                        onValueChange={(value: string) => setClientName(value)}
                        // validate={(value) => {
                        //     if (value.length < 3) {
                        //         return "Username must be at least 3 characters long";
                        //     }
                        // }}
                    />
                    <Input
                        label="Address"
                        labelPlacement="outside"
                        placeholder="Mississippi St"
                        name="address"
                        className="lg:my-1"
                        value={address}
                        onValueChange={(value: string) => setAddress(value)}
                        // validate={(value) => {
                        //     if (value.length < 3) {
                        //         return "Username must be at least 3 characters long";
                        //     }
                        // }}
                    />
                    <Input
                        label="Telephone Number"
                        labelPlacement="outside"
                        placeholder="081123456789"
                        name="tel"
                        className="lg:my-1"
                        value={tel}
                        onValueChange={(value: string) => setTel(value)}
                        // validate={(value) => {
                        //     if (value.length < 3) {
                        //         return "Username must be at least 3 characters long";
                        //     }
                        // }}
                    />

                    <div className="lg:flex lg:justify-end lg:w-full">
                        <button type="submit" disabled={isLoading} className="text-indigo-700 bg-indigo-50 px-5 py-2 mt-5 rounded-lg ring-1 ring-indigo-700/10 ring-inset">
                            {isLoading ? 'Loading ...' : 'Edit'}
                        </button>
                    </div>
                </Form>

            </div>

        </>
    )
}