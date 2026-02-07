#!/bin/bash

echo "Removing old client..."
rm schemas/generated.py
echo "Old generated types deleted"

echo "Generating new python types"
datamodel-codegen --input ../../openapi/spec.yaml --input-file-type openapi --output schemas/generated.py --openapi-scopes schemas paths
echo "New python types were generated!"
