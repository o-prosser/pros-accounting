ALTER TABLE "organisations" ADD COLUMN "end_of_financial_year" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "organisations" ADD COLUMN "theme_colour" varchar(6);--> statement-breakpoint
ALTER TABLE "organisations" ADD COLUMN "logo" text;