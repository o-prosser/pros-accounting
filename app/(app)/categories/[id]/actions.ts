"use server";

import { categoriesTable, subCategoriesTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { colours } from "@/utils/colours";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().length(36),
  name: z.string().min(3).max(50),
  account: z.string().max(100),
  colour: z.string().nullable(),
});

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const updateCategoryAction = async (formData: FormData) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    // return {
    //   error: fields.error.flatten().fieldErrors,
    // }
    throw new Error("");
  }

  try {
    const category = await db
      .update(categoriesTable)
      .set({
        name: fields.data.name,
        account: fields.data.account === "club" ? "club" : "charity",
        colour:
          fields.data.colour || colours[randomIntFromInterval(0, 16)].name,
      })
      .where(eq(categoriesTable.id, fields.data.id));
  } catch (error) {
    throw error;

    // return {
    //   error: {
    //     name: ["An error occurred. Please try again"]
    //   }
    // }
  }

  redirect(`/categories/${fields.data.id}`);
};

// Create sub category

const schemaTwo = z.object({
  name: z.string().min(3).max(50),
  categoryId: z.string().uuid(),
});

export const createSubCategoryAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schemaTwo.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
      success: false,
      newId: "",
    };
  }

  let id = "";

  try {
    const subCategory = await db
      .insert(subCategoriesTable)
      .values({
        name: fields.data.name,
        categoryId: fields.data.categoryId,
      })
      .returning({ id: subCategoriesTable.id });

    id = subCategory[0].id;
  } catch (error) {
    throw error;

    return {
      success: false,
      newId: "",
      errors: {
        name: ["An error occurred. Please try again"],
      },
    };
  }

  redirect(`/categories/${fields.data.categoryId}`);

  return {
    success: true,
    newId: id,
    errors: {
      name: "",
    },
  };
};
