/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from "next/image"
import Link from "next/link"

import leftArrow from '@/public/left-arrow.svg'

import { usePathname } from "next/navigation"

export default function WorkOrdersDetail({ params }: { params: Promise<{ slug: string }>}) {
    const path = usePathname()

    console.log(path)

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
                    <div className="lg:flex lg:justify-between lg:items-start lg:border-b pb-4">
                        <div>
                            <h3 className="text-xl font-semibold">Queen 69</h3>
                            <p>+62 123401923</p>
                        </div>

                        <p>In Progress</p>
                    </div>

                    <h1 className="lg:my-5 lg:text-2xl lg:font-semibold text-indigo-700">SURAT PERINTAH KERJA #001</h1>

                    <div className="mb-10">
                        <h4 className="text-lg font-semibold">Informasi Klien:</h4>
                        <div className="lg:grid lg:grid-cols-2">
                            <p>Nama: <span className="font-semibold">Apple Inc.</span></p>
                            <p>Alamat: <span className="font-semibold">Silicon Valley St.</span></p>
                            <p>No. Telepon: <span className="font-semibold">+1 (123)-123-1234</span></p>
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
                            <p className="lg:border lg:h-20 lg:mt-2"></p>
                        </div>

                        <div className="lg:w-1/4">
                            <p>Tanda Tangan</p>
                            <p className="lg:border-b lg:h-20 lg:mt-2"></p>
                        </div>
                    </div>

                    <Link href={`/dashboard/work-orders/${path.split('/')[2]}/edit`}>Edit Work Order</Link>
                </div>
            </main>
        </>
    )
}