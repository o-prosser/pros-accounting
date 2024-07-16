import { Title } from "@/components/ui/typography"
import CreateCategory from "./_components/create"
import { Suspense } from "react"
import CategoriesIndex from "./_components"

const CategoriesPage = () => {
  return (
    <>
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