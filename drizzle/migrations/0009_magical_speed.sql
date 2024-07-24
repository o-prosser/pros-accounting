CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" varchar NOT NULL,
	"size" numeric,
	"type" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "files_id_unique" UNIQUE("id")
);
