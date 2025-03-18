/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from "next/image"
import Link from "next/link"

import leftArrow from '@/public/left-arrow.svg'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"

import clsx from "clsx"
import { Alert } from "@heroui/alert"

export default function WorkOrdersDetail({ params }: { params: Promise<{ slug: string }>}) {
    const path = usePathname()

    const [message, setMessage] = useState<string>('')
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)

    const [order, setOrder] = useState<string>('')
    const [month, setMonth] = useState<string>('')
    const [year, setYear] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')
    const [worker, setWorker] = useState<string>('')
    const [clientName, setClientName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [itemDescription, setItemDescription] = useState<string>('')
    const [finishDate, setFinishDate] = useState<string>('')
    const [qty, setQty] = useState<string>('')

    useEffect(() => {
        getWorkOrderDetail()
    }, [])

    /**
     * This function fetches the detail of work
     * order from the database
     */
    const getWorkOrderDetail = async () => {
        const workOrderNumber = path.split('/')[3]

        try {
            const response = await fetch(`/api/work-orders/${workOrderNumber}`)

            if (!response.ok) {
                throw new Error("Fetching data failed. Please try again.")
            }

            const data = await response.json()

            const [o, m, y] = data.workOrderNumber.split('/')

            setClientName(data.client.name)
            setFinishDate(data.estimatedFinishDate.split('T')[0])
            setStatus(data.status)
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
        } catch(error) {
            console.log(error)
        }
    }

    const capitalize = (word: string) => {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1).toLowerCase()
    }

    /**
     * This function sets the status of current
     * work order to Ongoing
     */
    const handleClickStart = async () => {
        try {
            const response = await fetch(`/api/work-orders/${path.split('/')[3]}`, {
                method: "PUT",
                body: JSON.stringify({ status: 'ONGOING' })
            })

            if (!response.ok) {
                throw new Error ('Something went wrong. Please try again.')
            }

            const data = await response.json()

            if (data.success) {
                setStatus('ONGOING')
                setMessage(data.message)
                setIsAlertVisible(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * This function sets the status of current
     * work order to Cancelled
     */
    const handleClickCancel = async () => {
        try {
            const response = await fetch(`/api/work-orders/${path.split('/')[3]}`, {
                method: "PUT",
                body: JSON.stringify({ status: 'CANCELLED' })
            })

            if (!response.ok) {
                throw new Error("Something went wrong. Please try again.")
            }

            const data = await response.json()

            if (data.success) {
                setStatus('CANCELLED')
                setMessage(data.message)
                setIsAlertVisible(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Work Order Detail</h1>

                    <Link href='/dashboard/work-orders' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={leftArrow} alt={'plus'} width={20} height={20} className='mr-2' /> Back to Work Orders</Link>
                </div>

            </header>

            <main className='mb-[100px]'>
                <div className="max-w-7xl mx-auto mt-10 lg:px-8">
                    <Alert color={'success'} title={message} className={`${isAlertVisible ? 'flex' : 'hidden'}`} />
                </div>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:mb-10 flex flex-row">
                    <div className="w-10/12 mr-5">
                        <Form validationBehavior="native" className={`bg-white p-5 rounded-lg shadow-lg mb-5 ${isVisible ? 'block' : 'hidden'}`}>
                            <h1 className="text-2xl font-semibold mb-2">Create Invoice</h1>
                            <hr className="my-2"/>
                            <div className="flex items-center">
                                <p className="mb-1 mr-2">Invoice Number: </p>
                                <div className="flex flex-row mb-3 items-center">
                                    <Input type="number" name='invoiceOrder' className="w-[75px]" />
                                    <p className="mx-2">/</p>
                                    <Input type="number" name='invoiceMonth' className="w-[75px]" validate={(value: any) => {
                                        if (value.length > 2) {
                                            return "Tidak boleh lebih dari 2 angka"
                                        }
                                    }}/>
                                    <p className="mx-2">/</p>
                                    <Input type="number" name='invoiceYear' className="w-[75px]" validate={(value: any) => {
                                        if (value.length > 2) {
                                            return "Tidak boleh lebih dari 2 angka"
                                        }
                                    }} />
                                </div>
                            </div>
                            <button type="submit" className="bg-indigo-50 mt-5 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md">Create Invoice</button>
                        </Form>

                        {/* Work Order Form */}
                        <Form validationBehavior="native" className="bg-white p-5 rounded-lg shadow-lg">
                            <div className={clsx('px-3 py-1 rounded-md mb-3 font-bold', status == 'NOT_STARTED' ? 'bg-slate-100 text-slate-700' : status == 'ONGOING' ? 'bg-orange-50 text-orange-700' : status == 'COMPLETED' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>{status == 'NOT_STARTED' ? 'Not started' : status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</div>

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
                                                    <Input type="number" disabled name='order' className="w-[75px]" value={order} />
                                                    <p className="mx-2">/</p>
                                                    <Input type="number" disabled name='month' className="w-[75px]" value={month} />
                                                    <p className="mx-2">/</p>
                                                    <Input type="number" disabled name='year' className="w-[75px]" value={year} />
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td className="pr-2 text-right py-2">Pekerja: </td>
                                                <td className="py-2">
                                                    <Input type="text" name='worker' disabled value={worker} />
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td className="pr-2 text-right w-full py-2">Tanggal Selesai: </td>
                                                <td className="py-2">
                                                    <Input type="date" disabled name='date' value={finishDate} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <hr className="mt-5" />

                                <div className="flex mt-5 justify-between">
                                    <div className="w-1/2">
                                        <Textarea name="notes" value={notes} label="Catatan:" labelPlacement="outside" className="text-slate-400" />
                                    </div>

                                    <div className="text-slate-400">
                                        <h1 className="text-sm">Informasi Klien:</h1>

                                        <table className="text-sm mt-2">
                                            <tbody>
                                                <tr>
                                                    <td className="py-2 text-right px-2">Nama Klien: </td>
                                                    <td className="py-2">
                                                        <Input type="text" disabled value={clientName} />
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
                                                <Input type="text" disabled name='itemDescription' value={itemDescription} />
                                            </td>
                                            <td className="py-4 px-2">
                                                <Input type="text" disabled name='quantity' value={qty} />
                                            </td>
                                            <td className="py-4 px-2">
                                                <Input type="text" disabled name="price" value={price.toLocaleString()} />
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
                                                <td>Rp. {(parseInt(qty) * parseInt(price)).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Form>
                    </div>

                    <div className="bg-white w-2/12 flex flex-col shadow-xl h-fit p-3 rounded-lg">
                        <button className={`mb-5 px-1 py-2 rounded-md ${status == 'CANCELLED' ? 'bg-slate-200 text-slate-400' : 'bg-indigo-700 text-white'}`} disabled={status == 'CANCELLED' ? true : false}>Generate PDF</button>
                        <button className={`mb-5 bg-indigo-700 text-white px-1 py-2 rounded-md ${status != 'ONGOING' ? 'hidden' : 'block'}`} onClick={() => isVisible ? setIsVisible(false) : setIsVisible(true)}>{isVisible ? 'Close' : 'Open'} Invoice</button>
                        <button className={`mb-5 bg-indigo-700 text-white px-1 py-2 rounded-md ${status == 'NOT_STARTED' ? 'block' : 'hidden'}`} onClick={handleClickStart}>Start Work Order</button>
                        <button className={`mb-5 bg-red-700 text-white px-1 py-2 rounded-md ${status == 'NOT_STARTED' ? 'block' : 'hidden'}`} onClick={handleClickCancel}>Cancel Work Order</button>

                        <div className="text-center">
                            <Link href={`/dashboard/work-orders/${path.split('/')[3]}/edit`} className={`text-indigo-700 font-semibold hover:underline ${status == 'CANCELLED' ? 'hidden' : 'block'}`}>Edit Work Order</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}