/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Pagination } from '@heroui/pagination'

import plus from '@/public/plus.svg'

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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Work Orders</h1>

                    <Link href='/dashboard/work-orders/create' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={plus} alt={'plus'} width={12} height={12} className='mr-0.5' /> Add Work Order</Link>
                </div>
            </header>

            {/* Main content goes here */}
            <main className='mb-[50px]'>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Overdue Work Orders */}
                    <div className='mb-10'>
                        <h1 className='text-2xl font-semibold mb-5'>Overdue Work Order(s)</h1>

                        <table className="table-auto w-full">
                            <thead className='text-left border-b'>
                                <tr className='bg-indigo-50 text-indigo-700'>
                                    <th className='py-4 pl-2'>Work Order #</th>
                                    <th className='py-4 pl-2'>Furniture Size</th>
                                    <th className='py-4 pl-2'>Est. Finish Date</th>
                                    <th className='py-4 pl-2'>Price</th>
                                    <th className='py-4 pl-2'>Status</th>
                                    <th className='py-4 pl-2'>Client Name</th>
                                    <th className='py-4 pl-2'></th>
                                </tr>
                            </thead>
                            <tbody className='text-left'>
                                {
                                    overdue.map((workOrder: any) => (
                                        <tr className='border-b' key={workOrder.workOrderNumber}>
                                            <td className='py-4 pl-2'>{workOrder.workOrderNumber}</td>
                                            <td className='py-4 pl-2'>({workOrder.furnitureSize}) cm</td>
                                            <td className='py-4 pl-2'>{workOrder.estimatedFinishDate.split('T')[0]}</td>
                                            <td className='py-4 pl-2'>Rp. {workOrder.price}</td>
                                            <td className='py-4 pl-2'>
                                                <p>
                                                    {workOrder.status == 'NOT_STARTED' ? 'Not Started' : capitalize(workOrder.status)}
                                                </p>
                                            </td>
                                            <td className='py-4 pl-2'>{workOrder.client.name}</td>
                                            <td className='py-4 pl-2'>
                                                <button className='text-indigo-700 hover:underline'>View Detail</button>
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

                    <div className='mb-5'>
                        <h1 className='text-2xl font-semibold mb-5'>List of Work Orders</h1>
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
                                    <th className='py-4 pl-2'>Work Order #</th>
                                    <th className='py-4 pl-2'>Furniture Size</th>
                                    <th className='py-4 pl-2'>Est. Finish Date</th>
                                    <th className='py-4 pl-2'>Price</th>
                                    <th className='py-4 pl-2'>Status</th>
                                    <th className='py-4 pl-2'>Client Name</th>
                                    <th className='py-4 pl-2'></th>
                                </tr>
                            </thead>
                            <tbody className='text-left'>
                                {
                                    arr.map((workOrder: any) => (
                                        <tr className='border-b' key={workOrder.workOrderNumber}>
                                            <td className='py-4 pl-2'>{workOrder.workOrderNumber}</td>
                                            <td className='py-4 pl-2'>{workOrder.furnitureSize}</td>
                                            <td className='py-4 pl-2'>{workOrder.estimatedFinishDate.split('T')[0]}</td>
                                            <td className='py-4 pl-2'>Rp. {workOrder.price}</td>
                                            <td className='py-4 pl-2'>{workOrder.status == 'NOT_STARTED' ? 'Not Started' : capitalize(workOrder.status)}</td>
                                            <td className='py-4 pl-2'>{workOrder.client.name}</td>
                                            <td className='py-4 pl-2'>
                                                <button className='text-indigo-700 hover:underline'>View Detail</button>
                                            </td>
                                        </tr>
                                    ))
                                }
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