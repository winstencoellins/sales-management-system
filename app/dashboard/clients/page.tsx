/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from "react"
import { clsx } from "clsx"

import { Pagination } from "@heroui/pagination"

import Link from "next/link"
import Image from "next/image"

import plus from '@/public/plus.svg'
import pencil from '@/public/pencil.svg'

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

        console.log(data)

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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Client List</h1>

                    <Link href='/dashboard/clients/create' className='flex items-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset px-3 py-2 rounded-md'><Image src={plus} alt={'plus'} width={12} height={12} className='mr-0.5' /> Add Client</Link>
                </div>

            </header>

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="bg-white px-5 py-5 rounded-lg my-10 shadow-md">
                        <input type='text' className='border border-slate-200 px-2 py-3 rounded-md text-sm w-[350px]' placeholder="Search Client Name ..."/>

                        <hr className="my-8" />

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="font-normal text-slate-400 py-4 pl-2">No.</th>
                                    <th className="font-normal text-slate-400 py-4 pl-2">Name</th>
                                    <th className="font-normal text-slate-400 py-4 pl-2">Address</th>
                                    <th className="font-normal text-slate-400 py-4 pl-2">Telephone</th>
                                    <th className="font-normal text-slate-400 py-4 pl-2">Status</th>
                                    <th className="font-normal text-slate-400 py-4 pl-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arr.map((client: any, index: any) => (
                                        <tr key={index}>
                                            <td className="font-normal text-slate-400 py-4 pl-2">{index + 1}</td>
                                            <td className="font-normal text-slate-400 py-4 pl-2">{client.name}</td>
                                            <td className="font-normal text-slate-400 py-4 pl-2">{client.address}</td>
                                            <td className="font-normal text-slate-400 py-4 pl-2">{client.telephone}</td>
                                            <td className="font-normal py-4 pl-2">
                                                <p className={clsx('py-1 px-3 w-fit rounded-full', client.status == 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                                                    {client.status.charAt(0).toUpperCase() + client.status.slice(1).toLowerCase()}
                                                </p>
                                            </td>
                                            <td className="font-normal text-slate-400 py-4 pl-2"><Link href={`/dashboard/clients/${client.id}/edit`} className="text-yellow-500 flex items-center"><Image src={pencil} alt="icon" width={16} height={16} className="mr-1" />Edit Details</Link></td>
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

                </div>
            </main>
        </>
    )
}