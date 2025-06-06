# SnipMail

A simple web app that summarize and categorize email inbox with the help of LLM like ChatGPT, Gemini, or Claude.

## Prequisite

This project uses [Bun](https://bun.sh/) to develop and building the source code. 

## Backend Setup

The backend uses SQLite as the database with Drizzle as ORM. By default it uses `better-sqlite3` under the hood but you can make adjustment it on `drizzle.config.ts` config file and `src/lib/server/db/index.ts`.

```bash
# Generate SQLite .db file and push DB tables and schema
bunx drizzle-kit generate
bunx drizzle-kit push
```

## Developing

Running a dev server requires setting up database first.

```bash
bun run dev

# Optionally, to populate database with seeds (after registering first user)
bun seeds/populate.ts # NOTE: if better_sqlite3 throwing error uses
                      # tsx instead (https://tsx.is/)
```

For development, you can setup remote tunnel or publicly forwarding the port on `5173` to expose the API for the purpose of receiving webhook from Postmark. The endpoint for receiving webhook is `/api/webhook/inbox`.

## Building

```bash
bun run build
```
