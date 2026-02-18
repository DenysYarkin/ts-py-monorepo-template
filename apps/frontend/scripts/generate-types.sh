#!/bin/bash

set -euo pipefail

echo "Removing old frontend generated client..."
rm -rf generated/api

echo "Generating new TypeScript client and types"
openapi-ts -f ./openapi-ts.config.mjs

echo "New frontend API client and types were generated!"
