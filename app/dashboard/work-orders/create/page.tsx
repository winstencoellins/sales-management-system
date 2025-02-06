/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Alert } from "@heroui/alert"
import { Form } from "@heroui/form"
import { Input } from "@heroui/input"
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete"

import Image from "next/image"
import Link from "next/link"

import { FormEvent, useEffect, useState } from "react"

import leftArrow from "@/public/left-arrow.svg"

export default function CreateWorkOrder() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const response = await fetch('/api/clients')
        const data = await response.json()

        setClients(data)
    }

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
        } catch (error: any) {
            setIsVisible(true)
            setTitle('Work Order Number already exist!')
            setDescription('Please use another work order number because work order number needs to be unique.')
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

                    <Link href='/dashboard/work-orders' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={leftArrow} alt={'plus'} width={20} height={20} className='mr-2' /> Back to Work Order</Link>
                </div>

            </header>


            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Alert
                    color="danger"
                    description={description}
                    isVisible={isVisible}
                    title={title}
                    variant="faded"
                    onClose={() => setIsVisible(false)}
                    className="mb-5"
                />

                <Form validationBehavior="native" onSubmit={onSubmit} className="mt-5 mb-[200px]">
                    <Input
                        isRequired
                        label="Work Order Number"
                        labelPlacement="outside"
                        name="workOrderNumber"
                        placeholder="AZELF001"
                        type="text"
                        validate={(value) => {
                            if (value.length == 0) {
                                return "This field should not be empty.";
                            }
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
                            if (value.length == 0) {
                                return "This field should not be empty.";
                            }

                            if (value.split('x').length != 3 || value.split('x')[2] == "") {
                                return "Please follow the format of size given in the field."
                            }
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
                    <Autocomplete

                        label="Client"
                        placeholder="Select a client"
                        labelPlacement="outside"
                        name="client"
                    >
                        {
                            clients.map((client: any) => (
                                <AutocompleteItem key={client.name}>{client.name}</AutocompleteItem>
                            ))
                        }
                    </Autocomplete>

                    <button type="submit" disabled={isLoading} className="text-indigo-700 bg-indigo-50 px-5 py-2 mt-5 rounded-lg ring-1 ring-indigo-700/10 ring-inset">
                        {isLoading ? 'Loading ...' : 'Create'}
                    </button>
                </Form>
            </div>
        </>
    )
}