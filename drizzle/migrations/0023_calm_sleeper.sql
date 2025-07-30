ALTER TABLE "files" ADD COLUMN "organisationId" uuid;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "financialYearId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_organisationId_organisations_id_fk" FOREIGN KEY ("organisationId") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_financialYearId_financialYears_id_fk" FOREIGN KEY ("financialYearId") REFERENCES "public"."financialYears"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
