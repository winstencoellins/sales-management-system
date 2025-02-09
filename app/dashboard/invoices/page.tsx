/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from "next/image"
import Link from "next/link"

import { Pagination } from "@heroui/pagination"

import plus from "@/public/plus.svg"

export default function Invoices() {
    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Invoices</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className='mb-5'>
                        <h1 className='text-xl font-semibold mb-2'>List of Inovices</h1>
                        {/* Filters */}
                        <div className='flex'>
                            <div className='lg:flex lg:flex-col lg:w-1/4'>
                                <label className='mb-1 text-gray-500'>Number</label>
                                <input type="text" placeholder="Enter invoice number ..." className="border rounded-md lg:px-3 lg:py-2 mr-5" />
                            </div>

                            <div className='lg:flex lg:flex-col lg:w-1/4'>
                                <label className='mb-1 text-gray-500'>Created Date</label>
                                <input type="date" className="border rounded-md lg:px-3 lg:py-[7px] mr-5"/>
                            </div>

                            <div className='lg:flex lg:flex-col lg:w-1/4'>
                                <label className='mb-1 text-gray-500'>Status</label>
                                <select className='border rounded-md lg:px-3 lg:py-2.5 mr-5'>
                                    <option>All</option>
                                    <option>Paid</option>
                                    <option>In Progress</option>
                                </select>

                            </div>
                        </div>
                    </div>

                    {/* Tables */}
                    <table className="table-auto w-full">
                        <thead className='text-left border-b'>
                            <tr className='bg-indigo-50 text-indigo-700'>
                                <th className='py-2 pl-2'>Song</th>
                                <th className='py-2 pl-2'>Artist</th>
                                <th className='py-2 pl-2'>Year</th>
                            </tr>
                        </thead>
                        <tbody className='text-left'>
                            <tr className='border-b'>
                                <td className='py-2 pl-2'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td className='py-2 pl-2'>Malcolm Lockyer</td>
                                <td className='py-2 pl-2'>1961</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className='flex justify-between items-center mt-5'>
                        <p className="text-sm">Showing 1 to 10 from 90 results</p>
                        <Pagination initialPage={1} total={5} onChange={(page: number) => console.log(page)} className='text-indigo-700' />
                    </div>
                </div>
            </main>
        </>
    )
}