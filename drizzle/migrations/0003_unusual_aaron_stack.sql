CREATE TABLE IF NOT EXISTS "reset_password_tokens" (
	"token" varchar(6) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reset_password_tokens_token_unique" UNIQUE("token")
);
