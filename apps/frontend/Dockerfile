FROM node:20-alpine

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /workspace

COPY package.json package-lock.json ./
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN npm ci --workspace=apps/frontend --include-workspace-root

COPY apps/frontend ./apps/frontend

EXPOSE 3000

CMD ["npm", "run", "frontend:dev", "--workspace=apps/frontend", "--", "--hostname", "0.0.0.0", "--port", "3000"]
