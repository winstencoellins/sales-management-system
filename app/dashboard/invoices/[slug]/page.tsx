/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export default async function InvoicesDetail({ params }: { params: Promise<{ slug: string }>}) {
    const slug = (await params).slug
    
    return (
        <div>
            {slug}
        </div>
    )
}