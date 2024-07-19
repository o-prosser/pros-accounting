import 'dotenv/config'
import { categoriesTable, organisationsTable, subCategoriesTable, transactionsTable, usersTable } from "@/drizzle/schema"
import db from "@/lib/db"
import {loremIpsum} from 'react-lorem-ipsum'
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export default async function seed() {
  const user = await db.insert(usersTable).values({
    firstName: "Test",
    email: "test@test.com",
    password: "f41d04ba0e7a834084fab7e321b65418f1d11a9a1cd05438df65049bf48063f34404c18f44a4b2134090f573692ba7f9f870701c67c80eac5b0f9fe0b697b89e"
  }).returning();

  console.table(user);

  const organisation = await db.insert(organisationsTable).values({
    name: "Testing Organisation",
    slug: "testing-organisation",
    ownerId: user[0].id
  }).returning()

  await db.update(usersTable).set({organisationId: organisation[0].id}).where(eq(usersTable.id, user[0].id));

  console.table(organisation);

  Array.from(Array(10).keys()).map(async () => {
    const category = await db.insert(categoriesTable).values({
      organisationId: organisation[0].id,
      name: loremIpsum({startWithLoremIpsum: false, avgSentencesPerParagraph: 100})[0].split(" ")[Math.floor(Math.random()*100)],
      account: Math.random() > 0.5 ? "club" : "charity"
    }).returning({id: categoriesTable.id});

    const numberOfSubCategories = Math.floor((Math.random()/2)*10);

    Array.from(Array(numberOfSubCategories).keys()).map(async () => {
      const subCategory = await db.insert(subCategoriesTable).values({
        categoryId: category[0].id,
        name: loremIpsum({startWithLoremIpsum: false, avgSentencesPerParagraph: 100})[0].split(" ")[Math.floor(Math.random()*100)],
      }).returning({id: subCategoriesTable.id});

      const numberOfTransactions = Math.floor((Math.random()*2)*10);

      Array.from(Array(numberOfTransactions).keys()).map(async () => {
        const type = Math.random() > 0.5 ? "income" : "expense";

        await db.insert(transactionsTable).values({
          // @ts-ignore
          name: loremIpsum({startWithLoremIpsum: false, avgSentencesPerParagraph: 100})[0].split(" ")[Math.floor(Math.random()*100)],
          date: new Date(new Date(2024, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2024, 1, 1).getTime())),
          income: type === 'income' ? (parseFloat(Math.random().toFixed(4)) * 100) : null,
          expense: type === 'expense' ? parseFloat(Math.random().toFixed(4)) * 100 : null,
          categoryId: category[0].id,
          subCategoryId: subCategory[0].id,
          organisationId: organisation[0].id
        })
      })
    })
  })
}

seed();