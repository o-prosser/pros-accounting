"use server";

import { categoriesTable, subCategoriesTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
  account: z.string().max(100),
})

export const createCategoryAction = async (formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
    }
  }

  let id = "";

  try {
    const organisation = await selectCurrentOrganisation();

    console.log(organisation)

    const category = await db.insert(categoriesTable).values({
      name: fields.data.name,
      account: fields.data.account === 'club' ? 'club' : 'charity',
      organisationId: organisation.id
    }).returning({id: categoriesTable.id});

    console.log(category)

    id = category[0].id
  } catch (error) {
    throw error;

    return {
      error: {
        name: ["An error occurred. Please try again"]
      }
    }
  }

  redirect(`/categories/${id}`)
}

const schemaTwo = z.object({
  name: z.string().min(3).max(50),
  categoryId: z.string().uuid(),
})

export const createSubCategoryAction = async (formData: FormData) => {
  const fields = schemaTwo.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
    }
  }

  let id = "";

  try {
    const subCategory = await db.insert(subCategoriesTable).values({
      name: fields.data.name,
      categoryId: fields.data.categoryId
    }).returning({id: subCategoriesTable.id});

    id = subCategory[0].id
  } catch (error) {
    throw error;

    return {
      error: {
        name: ["An error occurred. Please try again"]
      }
    }
  }

  redirect(`/categories`)
}