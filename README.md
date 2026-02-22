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

Docker Compose uses variables from the root `.env.docker` file.
Update this file before running containers if you need custom DB credentials or port.
Use `DB_HOST_PORT`, `API_HOST_PORT`, and `FRONTEND_HOST_PORT` to control only host-exposed ports.

Prepare database by running migrations:

```sh
docker compose --env-file .env.docker up -d db api
docker compose --env-file .env.docker exec api alembic upgrade head
```

To run the database, frontend and backend containers (add `-d` flag to run in the background):

```sh
docker compose --env-file .env.docker up
```

By default, these URLs are exposed on the host:

- Frontend: `http://localhost:3000` (or `FRONTEND_HOST_PORT`)
- API: `http://localhost:8000` (or `API_HOST_PORT`)
- PostgreSQL: `localhost:5433` (or `DB_HOST_PORT`)

Database container uses a named volume `postgres_data:/var/lib/postgresql/data`, so the data will be persisted between container runs.
To tear down the database volume, run:

```sh
docker compose --env-file .env.docker down -v
```

**Note!** Do not forget to run migrations in a new db after database volume removal.

The database can be inspected by connecting to it with the following parameters:

- Host: `localhost`
- Port: `5433` (or your `DB_HOST_PORT` value from `.env.docker`)
- Database: `main_db` (or your `DB_NAME` value from `.env.docker`)
- Username: `username` (or your `DB_USERNAME` value from `.env.docker`)
- Password: `password` (or your `DB_PASSWORD` value from `.env.docker`)

Or via connection URL:

- `jdbc:postgresql://localhost:<DB_HOST_PORT>/main_db`

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
