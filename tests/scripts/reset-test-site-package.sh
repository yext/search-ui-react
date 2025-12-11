#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
TEST_SITE_DIR="$ROOT_DIR/test-site"
PACKAGE_NAME="@yext/search-ui-react"

cd "$TEST_SITE_DIR"

echo "<><><><> Removing packaged tarballs..."
rm -f yext-search-ui-react-*.tgz || true

echo "<><><><> Reverting $PACKAGE_NAME dependency to file:.."
node - "$TEST_SITE_DIR" "$PACKAGE_NAME" <<'NODE'
const fs = require('fs');
const path = require('path');
const [testSiteDir, packageName] = process.argv.slice(2);
const pkgPath = path.join(testSiteDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.dependencies = pkg.dependencies || {};
pkg.dependencies[packageName] = 'file:..';
pkg.dependencies.react = 'file:../node_modules/react';
pkg.dependencies['react-dom'] = 'file:../node_modules/react-dom';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE

echo "<><><><> Reinstalling dependencies in the test site..."
npm install

echo "<><><><> Test site restored to use the workspace dependency."
