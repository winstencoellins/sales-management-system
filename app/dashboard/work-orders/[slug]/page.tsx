/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from "next/image"
import Link from "next/link"

import leftArrow from '@/public/left-arrow.svg'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@heroui/form"
import { Input } from "@heroui/input"

export default function WorkOrdersDetail({ params }: { params: Promise<{ slug: string }>}) {
    const path = usePathname()

    const [workOrderNumber, setWorkOrderNumber] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('')
    const [worker, setWorker] = useState<string>('')
    const [clientName, setClientName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [tel, setTel] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [productDescription, setProductDescription] = useState<string>('') 

    useEffect(() => {
        getWorkOrderDetail()
    }, [])

    const getWorkOrderDetail = async () => {
        const workOrderNumber = path.split('/')[3]

        try {
            const response = await fetch(`/api/work-orders/${workOrderNumber}`)

            if (!response.ok) {
                throw new Error("Fetching data failed. Please try again.")
            }

            const data = await response.json()

            console.log(data)

            
            setWorkOrderNumber(workOrderNumber)
            setStatus(data.status)
            setClientName(data.client.name)
            setTel(data.client.telephone)
            setAddress(data.client.address)
            setPrice(data.price)
            // setNotes(data.notes)
            // setWorker(data.worker) 
            // setProductDescription(data.productDescription)
            
        } catch(error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {

    }

    const capitalize = (word: string) => {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1).toLowerCase()
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
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="lg:flex lg:w-full lg:justify-between lg:mb-10">
                        <div>
                            <Link href={`/dashboard/work-orders/${path.split('/')[3]}/edit`} className="text-indigo-700 bg-indigo-50 px-5 py-2 rounded-lg ring-1 ring-indigo-700/10 ring-inset">Edit Work Order</Link>
                            <button className="text-red-700 bg-red-50 px-5 py-2 rounded-lg ring-1 ring-red-700/10 ring-inset ml-5">Delete Work Order</button>
                        </div>

                        <div>
                            {
                                status == 'COMPLETED' ?
                                <button onClick={() => {isVisible ? setIsVisible(false) : setIsVisible(true)}} className="text-indigo-50 bg-indigo-700 px-5 py-2 rounded-lg ring-1 ring-indigo-700/10 ring-inset ml-5">{isVisible ? 'Cancel' : 'Generate Invoice'}</button>
                                : 
                                <button className="text-indigo-50 bg-indigo-700 px-5 py-2 rounded-lg ring-1 ring-indigo-700/10 ring-inset ml-5">Print Work Order</button>
                            }
                        </div>

                    </div>
                    
                    <div className={isVisible ? 'lg:block' : 'lg:hidden'}>
                        <Form validationBehavior="native" onSubmit={onSubmit}>
                            <Input
                                isRequired
                                label="Invoice Number"
                                labelPlacement="outside"
                                placeholder="UXIE001"
                                name="invoiceNumber"
                                className="lg:my-1"
                                // validate={(value) => {
                                //     if (value.length < 3) {
                                //         return "Username must be at least 3 characters long";
                                //     }
                                // }}
                            />

                            <button type='submit' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'>Create Invoice</button>
                        </Form>
                    </div>

                    <div className="lg:flex lg:justify-between lg:items-start lg:border-b pb-4">
                        <div>
                            <h3 className="text-xl font-semibold">Queen 69</h3>
                            <p>+62 123401923</p>
                        </div>

                        <p className={status == 'NOT_STARTED' ? 'text-slate-700 bg-slate-50 px-5 py-1 rounded-full ring-1 ring-slate-700/10 ring-inset ml-5' : status == 'ONGOING' ? 'text-orange-700 bg-orange-50 px-5 py-1 rounded-full ring-1 ring-orange-700/10 ring-inset ml-5' : status == 'COMPLETED' ? 'text-green-700 bg-green-50 px-5 py-1 rounded-full ring-1 ring-green-700/10 ring-inset ml-5' : 'text-red-700 bg-red-50 px-5 py-1 rounded-full ring-1 ring-red-700/10 ring-inset ml-5'}>{status == 'NOT_STARTED' ? 'Not Started' : capitalize(status)}</p>
                    </div>

                    <h1 className="lg:mt-5 lg:mb-1 lg:text-2xl lg:font-semibold text-indigo-700">SURAT PERINTAH KERJA #{workOrderNumber}</h1>

                    <p className="mb-5">Pekerja: <span className="font-semibold">Winsten</span></p>

                    <div className="mb-10">
                        <h4 className="text-lg font-semibold">Informasi Klien:</h4>
                        <div className="lg:grid lg:grid-cols-2">
                            <p>Nama: <span className="font-semibold">{clientName}</span></p>
                            <p>Alamat: <span className="font-semibold">{address}</span></p>
                            <p>No. Telepon: <span className="font-semibold">{tel}</span></p>
                        </div>
                    </div>

                    <table className="table-auto w-full">
                        <thead className='text-left border-b'>
                            <tr className='bg-indigo-50 text-indigo-700'>
                                <th className='py-4 pl-2'>Deskripsi Produk</th>
                                <th className='py-4 pl-2'>Jumlah</th>
                                <th className='py-4 pl-2'>Harga Satuan</th>
                                <th className='py-4 pl-2'>Total</th>
                            </tr>
                        </thead>
                        <tbody className='text-left'>
                            <tr className='border-b'>
                                <td className='py-5 pl-2 font-semibold'>Lemari 1000 Pintu</td>
                                <td className='py-5 pl-2 text-slate-500'>1</td>
                                <td className='py-5 pl-2 text-slate-500'>Rp. 10000000</td>
                                <td className='py-5 pl-2'>Rp. 10000000</td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td className="py-5 pl-2">Total Harga: </td>
                                <td className="py-5 pl-2">Rp. 10000000</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="lg:mt-20 lg:flex lg:justify-between">
                        <div className="lg:w-1/2">
                            <p>Catatan:</p>
                            <p className="lg:border lg:h-20 lg:mt-2 px-1 py-1">asdfasfasdfasdfasdfasdasdfasdf<br />asdf</p>
                        </div>

                        <div className="lg:w-1/4">
                            <p>Tanda Tangan</p>
                            <p className="lg:border-b lg:h-20 lg:mt-2"></p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}