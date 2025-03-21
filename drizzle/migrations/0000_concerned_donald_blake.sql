CREATE TABLE "balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"current" numeric NOT NULL,
	"income" numeric NOT NULL,
	"expenses" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"category" varchar NOT NULL,
	"maximum" numeric NOT NULL,
	"spent" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pots" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"target" numeric NOT NULL,
	"total" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"avatar" varchar NOT NULL,
	"name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"date" timestamp NOT NULL,
	"amount" numeric NOT NULL,
	"recurring" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "balance" ADD CONSTRAINT "balance_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pots" ADD CONSTRAINT "pots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");