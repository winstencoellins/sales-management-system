'use client'

import { Form } from "@heroui/form"
import { Input } from "@heroui/input"
import { Alert } from "@heroui/alert"

import Image from "next/image"
import Link from "next/link"

import leftArrow from '@/public/left-arrow.svg'
import deactivate from '@/public/deactivate.svg'
import pencil from '@/public/pencil.svg'
import activate from '@/public/activate.svg'

import { FormEvent, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function EditClient() {
    const path = usePathname()

    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [notification, setNotification] = useState<boolean>(true)

    const [clientName, setClientName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [status, setStatus] = useState<string>('')

    useEffect(() => {
        getClientDetail()
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)

        try {
            const response = await fetch(`/api/clients/${path.split('/')[3]}`, {
                method: 'PUT',
                body: formData
            })

            if (!response.ok) {
                throw new Error('There is an error while trying to submit the data. Please try again.')
            }

            const data = await response.json()

            if (data.success) {
                setIsVisible(true)
                setMessage(data.message)

                router.push('/dashboard/clients')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClick = async (event: any) => {
        const active = event.currentTarget.id == 'activate' ? false : true
        const clientId = path.split('/')[3]

        setIsLoadingStatus(true)

        try {
            const response = await fetch(`/api/clients/${clientId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    active: active
                })
            })

            if (!response.ok) {
                throw new Error('Failed to submit request. Please try again.')
            }

            const data = await response.json()

            if (data.success) {
                location.reload()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingStatus(false)
        }
    }

    const getClientDetail = async () => {
        const response = await fetch(`/api/clients/${path.split('/')[3]}`, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error('Failed to connect to database. Please try again')
        }

        const data = await response.json()

        if (data.success) {
            setStatus(data.client.status)
            setClientName(data.client.name)
            setAddress(data.client.address)
            setTel(data.client.telephone)
        }
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Client Detail</h1>

                    <div className="lg:flex lg:items-center lg:justify-center">
                        {
                            status == 'ACTIVE' ?
                            <button onClick={handleClick} disabled={isLoadingStatus} id="deactivate" className="text-red-700 bg-red-50 px-5 py-2 rounded-lg ring-1 ring-red-700/10 ring-inset mr-5 lg:flex lg:items-center">
                                <Image src={deactivate} alt='trash' width={20} height={20} className="mr-2" />
                                {isLoadingStatus ? 'Loading...' : 'Deactivate'}
                            </button>
                            :
                            <button onClick={handleClick} disabled={isLoadingStatus} id="activate" className="text-green-700 bg-green-50 px-5 py-2 rounded-lg ring-1 ring-green-700/10 ring-inset mr-5 lg:flex lg:items-center">
                                <Image src={activate} alt='trash' width={20} height={20} className="mr-2" />
                                {isLoadingStatus ? 'Loading...' : 'Activate'}
                            </button>
                        }

                        <Link href='/dashboard/clients' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={leftArrow} alt={'plus'} width={20} height={20} className='mr-2' /> Back to Clients</Link>
                    </div>
                </div>

            </header>


            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Alert
                    color={status == 'INACTIVE' ? 'danger' : 'warning'}
                    description={status == 'INACTIVE' ? 'This client has been removed from the dropdown list. To include it into the dropdown list, please reactivate this client by clicking on the Activate button.' : 'This client is included in the dropdown list. If this client is no longer in use, please deactivate this client by clicking on the deactivate button.'}
                    isVisible={notification}
                    title={status == 'INACTIVE' ? 'Client is Inactive!' : 'Client is Active!'}
                    variant="faded"
                    onClose={() => setNotification(false)}
                    className="mb-5"
                />

                <div className="bg-white w-6/12 mx-auto px-5 py-5 rounded-lg my-8">
                    <h1 className="text-xl">Edit Client Information</h1>

                    <hr className="my-5"/>

                    <Form validationBehavior="native" onSubmit={onSubmit}>
                        <Input
                            isRequired
                            label="Client Name"
                            labelPlacement="outside"
                            placeholder="Apple Inc."
                            name="clientName"
                            className="lg:my-5"
                            value={clientName}
                            onValueChange={(value: string) => setClientName(value)}
                            validate={(value) => {
                                if (value.length == 0) {
                                    return "This field should not be empty.";
                                }
                            }}
                        />
                        <Input
                            label="Address"
                            labelPlacement="outside"
                            placeholder="Mississippi St"
                            name="address"
                            className="lg:my-5"
                            value={address}
                            onValueChange={(value: string) => setAddress(value)}
                        />
                        <Input
                            label="Telephone Number"
                            labelPlacement="outside"
                            placeholder="081123456789"
                            name="tel"
                            className="lg:my-5"
                            value={tel}
                            onValueChange={(value: string) => setTel(value)}
                            validate={(value) => {
                                if (value.length == 0) {
                                    return "This field should not be empty.";
                                }
                            }}
                        />

                        <div className="lg:flex lg:justify-end lg:w-full">
                            <button type="submit" disabled={isLoading} className="text-indigo-700 bg-indigo-50 px-5 py-2 mt-5 rounded-lg ring-1 ring-indigo-700/10 ring-inset lg:flex lg:items-center">
                                <Image src={pencil} alt='pencil' height={20} width={20} className="mr-2" />
                                {isLoading ? 'Loading ...' : 'Edit'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>

        </>
    )
}