import { Title } from "@/components/ui/typography"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"
import TransactionsIndex from "./_components"

const TransactionsPage = () => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Title>Transactions</Title>
        <Button asChild><Link href="/transactions/create"><PlusIcon /><span className="hidden sm:inline">Add transaction</span></Link></Button>
      </div>

      <Suspense fallback={<>Loading transactions</>}>
        <TransactionsIndex />
      </Suspense>
    </>
  )
}

export default TransactionsPage