# Workflow

## Commands

Starting apps:

- `npx turbo run frontend:dev` -- `frontend` development
- `npx turbo run api:dev` -- `api` development

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
