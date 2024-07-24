import { filesTable } from "@/drizzle/schema";
import db from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  uploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "4MB" },
  }).onUploadComplete(async ({ metadata, file }) => {
    const savedFile = await db
      .insert(filesTable)
      .values({
        key: file.key,
        name: file.name,
        size: file.size.toString(),
        type: file.type,
      })
      .returning({ id: filesTable.id });

    return {
      id: savedFile[0].id,
      url: file.url,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
