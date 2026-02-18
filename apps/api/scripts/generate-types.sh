#!/bin/bash

set -euo pipefail

ROOT_CODEGEN_BIN="../../venv/bin/datamodel-codegen"

if command -v datamodel-codegen >/dev/null 2>&1; then
  CODEGEN_CMD="datamodel-codegen"
elif [ -x "${ROOT_CODEGEN_BIN}" ]; then
  CODEGEN_CMD="${ROOT_CODEGEN_BIN}"
else
  echo "Error: datamodel-codegen was not found."
  echo "Install it in the project venv (../../venv) or make it available on PATH."
  exit 1
fi

echo "Removing old client..."
rm -f schemas/generated.py
echo "Old generated types deleted"

echo "Generating new python types"
"${CODEGEN_CMD}" --input ../../openapi/spec.yaml --input-file-type openapi --output schemas/generated.py --openapi-scopes schemas paths
echo "New python types were generated!"
