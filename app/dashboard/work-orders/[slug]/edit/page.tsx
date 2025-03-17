/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Alert } from "@heroui/alert"
import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"


import leftArrow from "@/public/left-arrow.svg"

export default function EditWorkOrder() {
    const path = usePathname()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [order, setOrder] = useState<string>('')
    const [month, setMonth] = useState<string>('')
    const [year, setYear] = useState<string>('')
    const [worker, setWorker] = useState<string>('')
    const [clientName, setClientName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [itemDescription, setItemDescription] = useState<string>('')
    const [finishDate, setFinishDate] = useState<string>('')
    const [qty, setQty] = useState<string>('')

    const [workOrderNumber, setWorkOrderNumber] = useState<string>('')
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetchWorkOrderDetail()
        getClients()
    }, [])

    const fetchWorkOrderDetail = async () => {
        try {
            const response = await fetch(`/api/work-orders/${path.split('/')[3]}`)

            if (!response.ok) {
                throw new Error("Please try again. Your connection might be lost.")
            }

            const data = await response.json()

            console.log(data)

            const [o, m, y] = data.workOrderNumber.split('/')

            setClientName(data.client.name)
            setFinishDate(data.estimatedFinishDate.split('T')[0])
            // setStatus(data.status)
            setItemDescription(data.itemDescription)
            setNotes(data.notes)
            setPrice(data.price)
            setQty(data.quantity)
            setTel(data.client.telephone)
            setAddress(data.client.address)
            setWorker(data.worker)
            setOrder(o)
            setMonth(m)
            setYear(y)
            setWorkOrderNumber(data.workOrderNumber)
        } catch (error) {
            console.log(error)
        }
    }

    const getClients = async () => {
        const response = await fetch('/api/clients')
        const data = await response.json()

        const clientData = data.filter((client: any) => client.status == 'ACTIVE')

        setClients(clientData)
    }

    const handleChange = (event: any) => {
        const clientData: any = clients.find((client: any) => client.name == event)

        setAddress(clientData.address)
        setTel(clientData.telephone)
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        if (formData.get('client') == '') {
            formData.set('client', clientName)
        }

        formData.set('id', path.split('/')[3])

        const response = await fetch(`/api/work-orders`, {
            method: 'PUT',
            body: formData
        })

        const data = await response.json()

        console.log(data)
    }



    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Work Order #{workOrderNumber}</h1>

                    <Link href='/dashboard/work-orders' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={leftArrow} alt={'plus'} width={20} height={20} className='mr-2' /> Back to Work Order</Link>
                </div>

            </header>


            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Form validationBehavior="native" className="bg-white p-5 rounded-lg shadow-lg w-10/12 mr-5" onSubmit={onSubmit}>
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
                                            <Input type="number" onValueChange={(value: string) => setOrder(value)} name='order' className="w-[75px]" value={order} validate={(value: string) => {
                                                if (value.length == 0) {
                                                    return 'Tidak boleh kosong.'
                                                }
                                            }} />
                                            <p className="mx-2">/</p>
                                            <Input type="number" onValueChange={(value: string) => setMonth(value)} name='month' className="w-[75px]" value={month} validate={(value: string) => {
                                                if (value.length == 0) {
                                                    return 'Tidak boleh kosong.'
                                                }

                                                if (value.length > 2) {
                                                    return 'Hanya menerima 2 digit'
                                                }
                                            }} />
                                            <p className="mx-2">/</p>
                                            <Input type="number" onValueChange={(value: string) => setYear(value)} name='year' className="w-[75px]" value={year} validate={(value: string) => {
                                                if (value.length == 0) {
                                                    return 'Tidak boleh kosong.'
                                                }

                                                if (value.length > 2) {
                                                    return 'Hanya menerima 2 digit'
                                                }
                                            }} />
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="pr-2 text-right py-2">Pekerja: </td>
                                        <td className="py-2">
                                            <Input type="text" name='worker' onValueChange={(value: string) => setWorker(value)} value={worker} validate={(value: string) => {
                                                if (value.length == 0) {
                                                    return 'Tidak boleh kosong.'
                                                }
                                            }} />
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="pr-2 text-right w-full py-2">Tanggal Selesai: </td>
                                        <td className="py-2">
                                            <Input type="date" onValueChange={(value: string) => setFinishDate(value)} name='date' value={finishDate} validate={(value: string) => {
                                                if (value.length == 0) {
                                                    return 'Tidak boleh kosong.'
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
                                <Textarea name="notes" value={notes} onValueChange={(value: string) => setNotes(value)} label="Catatan:" labelPlacement="outside" className="text-slate-400" />
                            </div>

                            <div className="text-slate-400">
                                <h1 className="text-sm">Informasi Klien:</h1>

                                <table className="text-sm mt-2">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 text-right px-2">Nama Klien: </td>
                                            <td className="py-2">
                                                <Autocomplete name='client' onSelectionChange={(key: any) => handleChange(key)} placeholder={clientName}>
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
                                        <Input type="text" onValueChange={(value: string) => setItemDescription(value)} name='itemDescription' value={itemDescription} validate={(value: string) => {
                                            if (value.length == 0) {
                                                return 'Tidak boleh kosong.'
                                            }
                                        }}/>
                                    </td>
                                    <td className="py-4 px-2">
                                        <Input type="text" onValueChange={(value: string) => setQty(value)} name='quantity' value={qty} validate={(value: string) => {
                                            if (value.length == 0) {
                                                return 'Tidak boleh kosong.'
                                            }
                                        }}/>
                                    </td>
                                    <td className="py-4 px-2">
                                        <Input type="text" onValueChange={(value: string) => setPrice(value)} name="price" value={price} validate={(value: string) => {
                                            if (value.length == 0) {
                                                return 'Tidak boleh kosong.'
                                            }
                                        }}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr className="my-5" />

                        <div className="w-full flex justify-end text-slate-400">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="px-5">Total Harga: </td>
                                        <td>Rp. {(parseInt(qty) * parseInt(price)).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <button type="submit">Save</button>
                </Form>
            </div>
        </>
    )
}