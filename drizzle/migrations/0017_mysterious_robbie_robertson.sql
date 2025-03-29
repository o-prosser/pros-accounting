CREATE TABLE IF NOT EXISTS "financialYears" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisationId" uuid NOT NULL,
	"startDate" date,
	"endDate" date,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "financialYears_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "financialYearId" uuid;--> statement-breakpoint
ALTER TABLE "transfers" ADD COLUMN "financialYearId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "financialYears" ADD CONSTRAINT "financialYears_organisationId_organisations_id_fk" FOREIGN KEY ("organisationId") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_financialYearId_financialYears_id_fk" FOREIGN KEY ("financialYearId") REFERENCES "public"."financialYears"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transfers" ADD CONSTRAINT "transfers_financialYearId_financialYears_id_fk" FOREIGN KEY ("financialYearId") REFERENCES "public"."financialYears"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
