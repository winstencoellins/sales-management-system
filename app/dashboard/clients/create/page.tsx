/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Form } from "@heroui/form"
import { Input } from "@heroui/input"

import { FormEvent, useState } from "react"

export default function CreateClient() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const formData = new FormData(event.currentTarget)

            const response = await fetch('/api/clients', {
                method: "POST",
                body: formData
            })

            const data = await response.json()
        } catch(error) {

        } finally {
            setIsLoading(false)
        }


    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Work Order</h1>

                    {/* <Link href='/dashboard/work-orders' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={leftArrow} alt={'plus'} width={20} height={20} className='mr-2' /> Back to Work Order</Link> */}
                </div>

            </header>


            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <Input
                        label="Client Name"
                        labelPlacement="outside"
                        placeholder="Apple Inc."
                        name="clientName"
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
                        // validate={(value) => {
                        //     if (value.length < 3) {
                        //         return "Username must be at least 3 characters long";
                        //     }
                        // }}
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading ...' : 'Create'}
                    </button>
                </Form>

            </div>

        </>
    )
}