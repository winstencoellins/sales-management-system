/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Alert } from "@heroui/alert"
import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"


import leftArrow from "@/public/left-arrow.svg"

export default function CreateWorkOrder() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    }, [])

    /**
     * This function fetches the clients information
     * and displays it in the client dropdown
     */
    const getClients = async () => {
        const response = await fetch('/api/clients')
        const data = await response.json()

        setClients(data)
    }

    /**
     * This function handles the submission of the form
     * via `/api/work-orders` and redirects the user
     * to work orders page
     *
     * @param event: values in the form
     */
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

            if (data.success) {
                setIsVisible(true)
                setTitle('Work Order Number Created!')
                setDescription(data.message)
                setSuccess(true)

                router.push('/dashboard/work-orders')
            }

        } catch (error: any) {
            setIsVisible(true)
            setTitle('Work Order Number already exist!')
            setDescription('Please use another work order number because work order number needs to be unique.')
            setSuccess(false)

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
                    color={success ? 'success' : 'danger'}
                    description={description}
                    isVisible={isVisible}
                    title={title}
                    variant="faded"
                    onClose={() => setIsVisible(false)}
                    className="mb-5"
                />

                <Form validationBehavior="native" onSubmit={onSubmit} className="mt-5 mb-[200px]">
                    <div className="lg:grid lg:grid-cols-2 lg:w-full lg:gap-x-5 lg:my-1">
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
                            label="Product Description"
                            labelPlacement="outside"
                            name="productDescription"
                            placeholder="Wardrobe with 2 doors"
                            type="text"
                            validate={(value) => {
                                if (value.length == 0) {
                                    return "This field should not be empty.";
                                }
                            }}
                        />
                    </div>

                    <div className="lg:grid lg:grid-cols-2 lg:w-full lg:gap-x-5 lg:my-1">
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
                            label="Price"
                            labelPlacement="outside"
                            name="price"
                            placeholder="10000"
                            type="number"
                            validate={(value) => {
                                if (value.length == 0) {
                                    return "This field should not be empty.";
                                }
                            }}
                        />
                    </div>

                    <Input
                        isRequired
                        label="Estimated Finish Date"
                        labelPlacement="outside"
                        name="estimatedFinishDate"
                        type="date"
                        validate={(value) => {
                            const today = new Date()
                            const selectedDate = new Date(value)

                            if (value == '') {
                                return "This field should not be empty."
                            }

                            if (selectedDate.getTime() < today.getTime()) {
                                return "Estimated finish date can't be smaller than current date.";
                            }
                        }}
                        className="lg:my-1"
                    />
                    <Textarea
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0 lg:my-1"
                        label="Notes"
                        labelPlacement="outside"
                        placeholder="Enter your notes"
                        variant={"flat"}
                        name="notes"
                    />
                    <Autocomplete
                        isRequired
                        label="Client"
                        placeholder="Select a client"
                        labelPlacement="outside"
                        name="client"
                        className="lg:my-1"
                    >
                        {
                            clients.map((client: any) => (
                                <AutocompleteItem key={client.name}>{client.name}</AutocompleteItem>
                            ))
                        }
                    </Autocomplete>

                    <div className="lg:flex lg:justify-end lg:w-full">
                        <button type="submit" disabled={isLoading} className="text-indigo-700 bg-indigo-50 px-5 py-2 mt-5 rounded-lg ring-1 ring-indigo-700/10 ring-inset">
                            {isLoading ? 'Loading ...' : 'Create'}
                        </button>
                    </div>
                </Form>
            </div>
        </>
    )
}