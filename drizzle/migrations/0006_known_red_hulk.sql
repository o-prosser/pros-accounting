ALTER TABLE "transactions" DROP CONSTRAINT "transactions_subCategoryId_sub_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "subCategoryId" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subCategoryId_sub_categories_id_fk" FOREIGN KEY ("subCategoryId") REFERENCES "public"."sub_categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
