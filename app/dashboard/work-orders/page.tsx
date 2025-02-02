'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Pagination } from '@heroui/pagination'

import plus from '@/public/plus.svg'

export default function WorkOrders() {
    return (
        <>
            {/* Headers */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Work Orders</h1>

                    <Link href='/dashboard/work-orders/create' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={plus} alt={'plus'} width={12} height={12} className='mr-0.5' /> Create Work Order</Link>
                </div>
            </header>

            {/* Main content goes here */}
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Overdue Work Orders */}
                    <div className='mb-10'>
                        <h1 className='text-xl font-semibold mb-3'>Overdue Work Order(s)</h1>

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

                        <div className='flex justify-between items-center mt-5'>
                            <p className="text-sm">Showing 1 to 10 from 90 results</p>
                            <Pagination initialPage={1} total={5} onChange={(page: number) => console.log(page)} className='text-indigo-700' />
                        </div>
                    </div>

                    <div className='mb-5'>
                        <h1 className='text-xl font-semibold mb-2'>List of Work Orders</h1>
                        {/* Filters */}
                        <div className='flex'>
                            <div className='lg:flex lg:flex-col lg:w-1/4'>
                                <label className='mb-1 text-gray-500'>Number</label>
                                <input type="text" placeholder="Enter any work order number ..." className="border rounded-md lg:px-3 lg:py-2 mr-5" />
                            </div>

                            <div className='lg:flex lg:flex-col lg:w-1/4'>
                                <label className='mb-1 text-gray-500'>Estimated Finish Date</label>
                                <input type="date" className="border rounded-md lg:px-3 lg:py-[7px] mr-5"/>
                            </div>

                            <div className='lg:flex lg:flex-col lg:w-1/4'>
                                <label className='mb-1 text-gray-500'>Status</label>
                                <select className='border rounded-md lg:px-3 lg:py-2.5 mr-5'>
                                    <option>All</option>
                                    <option>In Progress</option>
                                    <option>Done</option>
                                    <option>Not Started</option>
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