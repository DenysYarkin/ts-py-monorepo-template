# Installation & Preparation

## Running locally

Prerequisites to run locally:

- `python`: 3.11+
- `postgres`

Installation steps:

1. Install turborepo and frontend dependencies: `npm i`
2. Create python virtual environment: `python3 -m venv venv`
3. Activate the venv and install the dependencides `pip3 install -r requirements.txt`
4. Copy `.env.example` files inside `apps/frontend` and `apps/api` dirs and rename new files to `.env`.
5. Fill created `.env` files with the values relevant for you

## Running with Docker

Prepare database by running migrations:
```sh
docker compose up -d db api
docker compose exec api alembic upgrade head
```

To run the database, frontend and backend containers `docker compose up` (or `docker compose up -d` to run in the background).

Database container uses a named volume `postgres_data:/var/lib/postgresql/data`, so the data will be persisted between container runs.
To tear down the database volume, run:
```sh
docker compose down -v
```
**Note!** Do not forget to run migrations in a new db after database volume removal.

The database can be inspected by connecting to it with the following parameters:
- Host: `localhost`
- Port: `5432` (or your DB_PORT value if you set it)
- Database: `maind_controllers` (or your DB_NAME)
- Username: `username` (or your DB_USERNAME)
- Password: `password` (or your DB_PASSWORD)

Or via connection URL:
- `jdbc:postgresql://localhost:5432/maind_controllers`

TODO: envs

# Workflow

## OpenAPI spec and SDK generation

This monorepo follows specification-first approach. The OpenAPI specification is stored in `openapi/` dir at the root of the project. Use specification is used to generate types for both backend and frontend, and request functions fro the backend.
Generated Python types are located at `apps/api/schemas/` dir.
Generated TypeScript types and request functions are located at `apps/frontend/generated/` dir.
**Note!** You must **always** use generated types when it's possible, on both frontend abd backend.
Before implementing or changing the endpoint in the backend, the OpenAPI specification must be updated respectively. After it's updated and new types are generated, the implementation can be done.

## Commands

Starting apps:

- `npx turbo run frontend:dev` -- `frontend` development
- `npx turbo run api:dev` -- `api` development. Make sure the virtual env is active before running this command.

Clients generations:

- `npx turbo run generate:client:py` -- generate Python types
- `npx turbo run generate:client:ts` -- generate Python types

Creating `alembic` migrations:

- `npx turbo run migrations:create -- -m "<description>"` -- create a new _empty_ migration
- `npx turbo run migrations:create:auto -- -m "<description>"` -- create a new migration with alembic's `--autogenerate` option, that would automatically convert changes of the data models in code into a migration.
- `npx turbo run migrations:run` -- run all the migrations in queue
- `npx turbo run migrations:revert:last`

**Note!**: `description` must be written as a short sentence to maintain save style across migrations names. For example, `npx turbo run migrations:create -- -m "add username to users table"`.

## Frontend

### `shadcn/ui` components installation

`shadcn/ui` configuration is bound to the `frontend` app since it's supposed to be the only web application in the monorepo.
To install a new shadcn component, navigate to `apps/frontend` and run the command for installation:

```sh
cd apps/frontend
npx shadcn@latest add <component name>
```

All the installed components are stored at `apps/frontend/src/shared/components/ui`.
