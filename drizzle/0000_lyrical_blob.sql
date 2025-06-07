CREATE TABLE `mail` (
	`id` text PRIMARY KEY NOT NULL,
	`summarry` text,
	`subject` text,
	`text_body` text,
	`has_read` integer,
	`categories` text,
	`sentiment` integer,
	`mail_from` text NOT NULL,
	`mail_from_name` text,
	`mail_to` text NOT NULL,
	`mail_to_user` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`mail_to_user`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `mail_to_idc` ON `mail` (`mail_to_user`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `mail` (`created_at`);--> statement-breakpoint
CREATE INDEX `categories_idx` ON `mail` (`categories`);--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text,
	`password_hash` text NOT NULL,
	`avatar` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_idx` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `inbound_email_address_idx` ON `user` (`email`);--> statement-breakpoint
CREATE VIEW `inbox_category_view` AS SELECT
	mail.mail_to_user AS user,
  CAST(COUNT(DISTINCT CASE WHEN value = 'sponsorship' THEN mail.id END) AS INTEGER) AS sponsorship_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'advertisement' THEN mail.id END) AS INTEGER) AS advertisement_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'promotion' THEN mail.id END) AS INTEGER) AS promotion_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'collaboration' THEN mail.id END) AS INTEGER) AS collaboration_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'relaxed' THEN mail.id END) AS INTEGER) AS relaxed_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'formal' THEN mail.id END) AS INTEGER) AS formal_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'humorous' THEN mail.id END) AS INTEGER) AS humorous_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'angry' THEN mail.id END) AS INTEGER) AS angry_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'sad' THEN mail.id END) AS INTEGER) AS sad_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'polite' THEN mail.id END) AS INTEGER) AS polite_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'individual' THEN mail.id END) AS INTEGER) AS individual_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'organization' THEN mail.id END) AS INTEGER) AS organization_count,
CAST(COUNT(DISTINCT CASE WHEN value = 'government' THEN mail.id END) AS INTEGER) AS government_count
FROM mail, json_each(mail.categories)
WHERE value IN ('sponsorship', 'advertisement', 'promotion', 'collaboration', 'relaxed', 'formal', 'humorous', 'angry', 'sad', 'polite', 'individual', 'organization', 'government')
GROUP BY mail.mail_to;