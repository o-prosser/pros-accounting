import { Title } from "@/components/ui/typography"
import { Suspense } from "react"
import CategoriesIndex from "./_components"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Metadata } from "next"
import { LoaderCircleIcon, TagIcon } from "lucide-react"
import dynamic from "next/dynamic"

const CreateCategory = dynamic(() => import("./_components/create"))

export const metadata: Metadata = {title: "Categories"}

export const runtime = 'edge';

const CategoriesPage = () => {
  return (
    <>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Categories</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <div className="flex items-start justify-between">
        <Title icon={TagIcon}>Categories</Title>
        <CreateCategory />
      </div>

      <Suspense
        fallback={
          <div className="rounded-lg bg-muted flex items-center justify-center gap-2 h-[80vh]">
            <LoaderCircleIcon className="h-5 w-5 animate-spin" />
            <span className="font-medium text-sm">Loading categories...</span>
          </div>
        }
      >
        <CategoriesIndex />
      </Suspense>
    </>
  );
}

export default CategoriesPage