/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

import Image from 'next/image'
import Link from 'next/link'

import { Pagination } from '@heroui/pagination'

import plus from '@/public/plus.svg'
import dropdown from '@/public/dropdown-arrow.svg'

export default function WorkOrders() {
    const [workOrders, setWorkOrders] = useState([])
    const [arr, setArr] = useState([])
    const [overdue, setOverdue] = useState([])

    useEffect(() => {
        getWorkOrders()
    }, [])

    const getWorkOrders = async () => {
        const response = await fetch('/api/work-orders')

        if (!response.ok) {
            throw new Error('Failed to get the data. Please try again.')
        }

        const data = await response.json()

        console.log(data)

        // Work Order that is not overdue
        const onTrack = data.filter((workOrder: any) => workOrderOnTrack(workOrder.estimatedFinishDate))

        console.log(onTrack)

        setWorkOrders(data)
        setArr(onTrack)

        // Overdue Work Order filter
        const overdueWorkOrder: any = data.filter((workOrder: any) => overdueDate(workOrder.estimatedFinishDate))

        setOverdue(overdueWorkOrder)
    }

    const workOrderOnTrack = (value: string) => {
        const today = new Date()
        const date = new Date(value)

        return date > today
    }

    const overdueDate = (value: string) => {
        const today = new Date()
        const date = new Date(value)

        console.log(today.getTime(), date.getTime())

        return date < today
    }

    const capitalize = (word: string) => {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1)
    }

    return (
        <>
            {/* Headers */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Work Order List</h1>

                    <Link href='/dashboard/work-orders/create' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={plus} alt={'plus'} width={12} height={12} className='mr-0.5' /> Add Work Order</Link>
                </div>
            </header>

            {/* Main content goes here */}
            <main className='mb-[50px]'>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Work Orders */}
                    <div className='my-10 bg-white px-5 py-5 rounded-lg shadow-md'>
                        <div className='flex justify-between mb-8'>
                            <input type="text" placeholder='Search by Customer, Work Order #' className='border border-slate-200 px-2 py-3 rounded-md text-sm w-[350px]'/>

                            <div className='flex'>
                                <div className='flex mr-14'>
                                    <select className="border border-slate-200 px-2 py-3 rounded-md text-sm appearance-none w-[200px]">
                                        <option>Status</option>
                                        <option>No</option>
                                        <option>Maybe</option>
                                    </select>
                                    <Image src={dropdown} alt='dropdown' className='-mx-[25px]' width={20} height={20} />
                                </div>

                                <input type="date" className='border border-slate-200 px-2 py-3 rounded-md text-sm w-[200px]' />
                            </div>
                        </div>

                        <hr className='border border-slate-100 mb-8' />

                        <table className="table-auto w-full">
                            <thead className='text-left border-b'>
                                <tr className='text-slate-400'>
                                    <th className='py-4 pl-2 font-normal'>#</th>
                                    <th className='py-4 pl-2 font-normal'>Client Name</th>
                                    <th className='py-4 pl-2 font-normal'>Est. Finish Date</th>
                                    <th className='py-4 pl-2 font-normal'>Price</th>
                                    <th className='py-4 pl-2 font-normal'>Status</th>
                                    <th className='py-4 pl-2 font-normal'>Worker</th>
                                    <th className='py-4 pl-2 font-normal'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-left'>
                                {
                                    arr.length == 0
                                    ?
                                    <tr><td className='text-slate-500 py-5'>No work order ...</td></tr>
                                    :
                                    arr.map((workOrder: any) => (
                                        <tr className='border-b' key={workOrder.workOrderNumber}>
                                            <td className='py-4 pl-2'>{workOrder.workOrderNumber}</td>
                                            <td className='py-4 pl-2'>{workOrder.client.name}</td>
                                            <td className='py-4 pl-2'>{workOrder.estimatedFinishDate.split('T')[0]}</td>
                                            <td className='py-4 pl-2'>Rp. {workOrder.price}</td>
                                            <td className='py-4 pl-2'>
                                                <p className={clsx('px-3 py-1 w-fit rounded-full', workOrder.status == 'NOT_STARTED' ? 'bg-slate-50 text-slate-700' : workOrder.status == 'ONGOING' ? 'bg-orang-50 text-orange-700' : workOrder.status == 'COMPLETED' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                                                    {workOrder.status == 'NOT_STARTED' ? 'Not Started' : capitalize(workOrder.status)}
                                                </p>
                                            </td>
                                            <td className='py-4 pl-2'>{workOrder.worker}</td>
                                            <td className='py-4 pl-2'>
                                                <Link href={`/dashboard/work-orders/${workOrder.id}`}>View Detail</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className='flex justify-between items-center mt-5'>
                            <p className="text-sm">Showing 1 to 10 from 90 results</p>
                            <Pagination initialPage={1} total={5} onChange={(page: number) => console.log(page)} className='text-indigo-700' />
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}