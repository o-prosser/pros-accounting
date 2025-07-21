ALTER TABLE "categories" ADD COLUMN "financialYearId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_financialYearId_financialYears_id_fk" FOREIGN KEY ("financialYearId") REFERENCES "public"."financialYears"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
