CREATE TABLE IF NOT EXISTS "sub_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"categoryId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "sub_categories_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "transactiosn" RENAME TO "transactions";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactiosn_id_unique";--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactiosn_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactiosn_subCategoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactiosn_organisationId_organisations_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "account" "account" NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "organisationId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_organisationId_organisations_id_fk" FOREIGN KEY ("organisationId") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subCategoryId_sub_categories_id_fk" FOREIGN KEY ("subCategoryId") REFERENCES "public"."sub_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_organisationId_organisations_id_fk" FOREIGN KEY ("organisationId") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "categoryId";--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_unique" UNIQUE("id");