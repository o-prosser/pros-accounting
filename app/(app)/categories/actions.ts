"use server";

import { categoriesTable, subCategoriesTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { selectCurrentOrganisation } from "@/models/organisation";
import { colours } from "@/utils/colours";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
  // account: z.string().max(100),
  colour: z.string().nullable(),
});

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createCategoryAction = async (
  prevState: any,
  formData: FormData,
) => {
  const fields = schema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    return {
      error: fields.error.flatten().fieldErrors,
      success: false,
      newId: "",
    };
  }

  let id = "";

  try {
    const organisation = await selectCurrentOrganisation();

    const category = await db
      .insert(categoriesTable)
      .values({
        name: fields.data.name,
        // account: fields.data.account === 'club' ? 'club' : 'charity',
        colour:
          fields.data.colour || colours[randomIntFromInterval(0, 16)].name,
        financialYearId:
          organisation.financialYears.find((fy) => fy.isCurrent)?.id || null,
        organisationId: organisation.id,
      })
      .returning({ id: categoriesTable.id });

    id = category[0].id;
  } catch (error) {
    return {
      success: false,
      newId: "",
      errors: {
        name: ["An error occurred. Please try again"],
      },
    };
  }

  revalidatePath(`/categories`);

  return {
    success: true,
    newId: id,
    errors: {
      name: "",
    },
  };
};
