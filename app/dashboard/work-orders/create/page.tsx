/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

import plus from "@/public/plus.svg"
import leftArrow from "@/public/left-arrow.svg"

export default function CreateWorkOrder() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [clients, setClients] = useState([])
    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)

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

        const clientData = data.filter((client: any) => client.status == 'ACTIVE')

        setClients(clientData)
    }

    /**
     * This function handles the address and telephone
     * input if the dropdown form changes
     *
     * @param event
     */
    const handleChange = (event: any) => {
        const clientData: any = clients.find((client: any) => client.name == event)

        setAddress(clientData.address)
        setTel(clientData.telephone)
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


            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:mb-10">
                {/* Work Order Form */}
                <Form validationBehavior="native" onSubmit={onSubmit} className="bg-white p-5 rounded-lg shadow-lg">
                    {/* Work Order */}
                    <div className="w-full">
                        {/* Header */}
                        <div className="flex justify-between">
                            <div className="">
                                <h1>LOGO</h1>
                                <p className="text-sm text-slate-400">
                                    Jln. K L Yos Sudarso No. 153 AB <br />
                                    Medan, 20238, Sumatera Utara <br />
                                    +62 81 - 111 - 1111
                                </p>
                            </div>

                            <table className="text-slate-400 text-sm">
                                <tbody>
                                    <tr className="">
                                        <td className="pr-2 text-right py-2">No. SPK: </td>
                                        <td className="flex items-center py-2">
                                            <Input type="number" name='order' className="w-[75px]" placeholder="01" validate={(value) => {
                                                if (value.length == 0) {
                                                    return "Tidak boleh kosong"
                                                }
                                            }} />
                                            <p className="mx-2">/</p>
                                            <Input type="number" name='month' className="w-[75px]" placeholder="01" validate={(value) => {
                                                if (value.length == 0) {
                                                    return "Tidak boleh kosong"
                                                }
                                            }} />
                                            <p className="mx-2">/</p>
                                            <Input type="number" name='year' className="w-[75px]" placeholder="01" validate={(value) => {
                                                if (value.length == 0) {
                                                    return "Tidak boleh kosong"
                                                }
                                            }} />
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="pr-2 text-right py-2">Pekerja: </td>
                                        <td className="py-2">
                                            <Input type="text" name='worker' className="" validate={(value) => {
                                                if (value.length == 0) {
                                                    return "Tidak boleh kosong"
                                                }
                                            }} placeholder="John Doe" />
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="pr-2 text-right w-full py-2">Tanggal Selesai: </td>
                                        <td className="py-2">
                                            <Input type="date" name='date' className="" validate={(value) => {
                                                if (value.length == 0) {
                                                    return "Tidak boleh kosong"
                                                }
                                            }} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr className="mt-5" />

                        <div className="flex mt-5 justify-between">
                            <div className="w-1/2">
                                <Textarea name="notes" placeholder="Masukkan catatan ..." label="Catatan:" labelPlacement="outside" className="text-slate-400" />
                            </div>

                            <div className="text-slate-400">
                                <h1 className="text-sm">Informasi Klien:</h1>

                                <table className="text-sm mt-2">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 text-right px-2">Nama Klien: </td>
                                            <td className="py-2">
                                                <Autocomplete name='client' onSelectionChange={(key: any) => handleChange(key)} className="">
                                                    {
                                                        clients.map((client: any, index: number) => (
                                                            <AutocompleteItem key={client.name} className="bg-white rounded-none">{client.name}</AutocompleteItem>
                                                        ))
                                                    }
                                                </Autocomplete>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-right px-2">Alamat: </td>
                                            <td className="py-2">
                                                <Input type="text" value={address} disabled className="hover:cursor-not-allowed" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-right px-2">No. Telepon: </td>
                                            <td className="py-2">
                                                <Input type="text" value={tel} disabled className="hover:cursor-not-allowed" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <hr className="my-5"/>

                        <table className="w-full text-left text-slate-400">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="py-3 px-3">Deskripsi Item</th>
                                    <th className="py-3 px-3">Qty</th>
                                    <th className="py-3 px-3">Harga Satuan</th>
                                    {/* <th className="py-3 px-3"></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-4 px-2">
                                        <Input type="text" name='itemDescription' placeholder="Lemari 3 pintu" validate={(value) => {
                                            if (value.length == 0) {
                                                return 'Tidak boleh kosong'
                                            }
                                        }}/>
                                    </td>
                                    <td className="py-4 px-2">
                                        <Input type="number" name='quantity' onValueChange={(value: any) => setQty(value)} placeholder="1" validate={(value) => {
                                            if (value.length == 0) {
                                                return 'Tidak boleh kosong'
                                            }
                                        }}/>
                                    </td>
                                    <td className="py-4 px-2">
                                        <Input type="number" name="price" onValueChange={(value: any) => setPrice(value)} placeholder="3500000" validate={(value) => {
                                            if (value.length == 0) {
                                                return 'Tidak boleh kosong'
                                            }
                                        }}/>
                                    </td>
                                    {/* <td className="py-4 px-2 text-center">
                                        <button className="bg-red-50 ring-1 ring-red-700/10 ring-inset px-2 py-2 rounded-md">
                                            <Image src={trash} alt='icon' width={20} height={20} />
                                        </button>
                                    </td> */}
                                </tr>
                            </tbody>
                        </table>

                        <hr className="my-5" />

                        <div className="w-full flex justify-end text-slate-400">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="px-5">Total Harga: </td>
                                        <td>Rp. {(qty * price).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end w-full mt-10">
                            <button type="submit" className="flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md" disabled={isLoading}><Image src={plus} alt="icon" width={16} height={16} className="mr-2"/>{isLoading ? 'Loading...' : 'Create New'}</button>
                        </div>


                    </div>
                </Form>
            </div>
        </>
    )
}