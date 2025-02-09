/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from "react"

import { Pagination } from "@heroui/pagination"

import Link from "next/link"
import Image from "next/image"

import plus from '@/public/plus.svg'

export default function Clients() {
    const LIMIT = 10

    const [clients, setClients] = useState([])
    const [arr, setArr] = useState([])
    const [startIndex, setStartIndex] = useState<number>(1)
    const [endIndex, setEndIndex] = useState<number>(LIMIT)

    const totalPage = Math.ceil(clients.length / LIMIT)

    useEffect(() => {
        getClients();
    }, [])

    /**
     * This function fetches the client via `/api/clients`
     */
    const getClients = async () => {
        const response = await fetch('/api/clients')
        const data = await response.json()

        setClients(data)
        setArr(data)
    }

    /**
     * This function handles pagination data for client's table.
     * It will set the start and end of the pagination result
     *
     * @param page
     */
    const handlePaginationChange = (page: number) => {
        const start = LIMIT * page - LIMIT + 1
        const end = LIMIT * page
        const result = clients.slice(start - 1, end - 1)

        setStartIndex(start)
        setEndIndex(end)
        setArr(result)
    }

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 flex justify-between items-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
                    
                    <Link href='/dashboard/clients/create' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={plus} alt={'plus'} width={12} height={12} className='mr-0.5' /> Add Client</Link>
                </div>

            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold mb-5">List of Clients</h1>

                    {/* Filters */}
                    <div className="mb-5">
                        <div className="lg:flex lg:flex-col lg:w-1/4">
                            <label className="mb-1 text-gray-500">Client Name</label>
                            <input type='text' className="border rounded-md lg:px-3 lg:py-2 mr-5" placeholder="Enter a client name ..."/>
                        </div>
                    </div>

                    {/* Tables */}
                    <table className="table-auto w-full">
                        <thead className='text-left border-b'>
                            <tr className='bg-indigo-50 text-indigo-700'>
                                <th className='py-4 pl-2'>Name</th>
                                <th className='py-4 pl-2'>Address</th>
                                <th className='py-4 pl-2'>Telephone No.</th>
                                <th className='py-4 pl-2'></th>
                            </tr>
                        </thead>
                        <tbody className='text-left'>
                            {
                                arr.map((client: any, index) => (
                                    <tr className='border-b' key={client.name}>
                                        <td className='py-5 pl-2 font-semibold'>{client.name}</td>
                                        <td className='py-5 pl-2 text-slate-500'>{client.address}</td>
                                        <td className='py-5 pl-2 text-slate-500'>{client.telephone}</td>
                                        <td className='py-5 pl-2'><Link href={`/dashboard/clients/${client.id}/edit`} className="text-indigo-700 hover:underline">Edit Details</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className='flex justify-between items-center mt-5'>
                        <p className="text-sm">Showing {startIndex} to {clients.length < LIMIT ? clients.length : endIndex} from {clients.length} results</p>
                        <Pagination initialPage={1} total={totalPage} onChange={(page: number) => handlePaginationChange(page)} className='text-indigo-700' />
                    </div>
                </div>
            </main>
        </>
    )
}