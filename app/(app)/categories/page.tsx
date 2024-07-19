import { Title } from "@/components/ui/typography"
import CreateCategory from "./_components/create"
import { Suspense } from "react"
import CategoriesIndex from "./_components"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Metadata } from "next"

export const metadata: Metadata = {title: "Categories"}

const CategoriesPage = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Transactions</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between">
        <Title>Transaction categories</Title>
        <CreateCategory />
      </div>

      <Suspense fallback={<>Loading categories</>}>
        <CategoriesIndex />
      </Suspense>
    </>
  )
}

export default CategoriesPage