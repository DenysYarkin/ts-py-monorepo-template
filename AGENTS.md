# General information

This project is a template for a monorepo that contains 2 apps:

- api -- Python FastAPI app
- frontend -- Next.js app
  The project uses Turborepo for managing apps.

# Technologies

## `api`

We use Python 3.11 with FastAPI framework for the backend app.
We use Pydantic for data validation and typing.
As an ORM we use SQLAlchemy, and as a database we use PostgreSQL.
Also, Alembic is used for database migrations.

## `frontend`

We use Next.js as a framework for the frontend app. We do not use any specific component library, but we use shadcn/ui for defining reusable components.
All the styling is done with Tailwind, specifically, shadcn-related custom tailwind classes must be used in every case when it's possible.
For the state management we use Effector.

# Openapi specification + Python and TypeScript types generation

This monorepo follows spec-first approach. The OpenAPI specification is stored in `openapi/` dir at the root of the project.
Before implementing or changing the endpoint in the backend, the openapi specification must be updated respectively. After it's updated and new types are generated, the implementation can be done.
Generated Python types are stored in `apps/api/schemas/` dir.
Generated TypeScript types and request functions are stored in `apps/frontend/generated/` dir.
Pay attention that you must ALWAYS use generated types when it's possible.

Clients generation commands:

- `npx turbo run generate:client:py` -- generate Python types
- `npx turbo run generate:client:ts` -- generate Python types

# Guidelines

1. All the changes made to the codebase must ensure that the project remains maintainable and scalable.
2. DO NOT make any manual changes to the generated types (both Python and TypeScript). Instead, if you need to change the types, change the openapi specification and generate the types again.
3. DO NOT run commands for starting the project. Instead, if something has to be manually tested, ask the user to do it.
