# Changing db schema

<https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql>

After updating the schema, to run `prisma migrate dev` or `prisma db push`  
This will keep database schema in sync with prisma schema (not recommended in production) and regenerate the prisma client in node modules

`prisma migrate dev` is used to create an SQL migration based on changes in the Prisma schema, apply it, and generate Prisma Client.  
This command also generates a history of .sql migration files.  
This command requires a shadow database and is not supported on MongoDB. Instead, `db push` is used for MongoDB.

`prisma db push` is used to create the database schema based on the Prisma schema without any migrations.  
If db push anticipates that the changes could result in data loss, it will throw an error and require the --accept-data-loss option if you still want to make the changes.

Vice versa, you may create schemas based off of your database with `prisma db pull`.  
<https://www.prisma.io/docs/orm/prisma-schema/introspection#the-prisma-db-pull-command>

Note that after `prisma db pull`, run `prisma generate` to generate a new Prisma client.

# Seeding db

Run `npx prisma db seed` after configuring seed data under prisma/seed.ts

# Reset db

Run `npx prisma migrate reset` to drop database/schema if possible. Otherwise it will perform a soft reset.  
Creates a new database/schema with the same name if the database/schema was dropped.  
Applies all migrations.  
Runs seed scripts.
