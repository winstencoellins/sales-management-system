'use client'

import { Form } from "@heroui/form"
import { Input } from "@heroui/input"
import { FormEvent, useState } from "react"

export default function CreateWorkOrder() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/work-orders', {
                method: "POST",
                body: formData
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            const data = await response.json()

            if (data) {
                setMessage('Work Order created successfully')
            }
        } catch (error: any) {
            setError(error.message)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Work Order</h1>
                </div>

            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Form validationBehavior="native" onSubmit={onSubmit}>
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="AZELF001"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Furniture Size"
                        labelPlacement="outside"
                        name="furnitureSize"
                        placeholder="10x20x30"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Estimated Finish Date"
                        labelPlacement="outside"
                        name="estimatedFinishDate"
                        type="date"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <Input
                        isRequired
                        label="Price"
                        labelPlacement="outside"
                        name="price"
                        placeholder="10000"
                        type="text"
                        validate={(value) => {
                        if (value.length < 3) {
                            return "Username must be at least 3 characters long";
                        }

                        return value === "admin" ? "Nice try!" : null;
                        }}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading ...' : 'Submit'}
                    </button>
                </Form>
            </div>
        </>
    )
}