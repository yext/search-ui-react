#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
TEST_SITE_DIR="$ROOT_DIR/test-site"
PACKAGE_NAME="@yext/search-ui-react"
NPM_CACHE_DIR="$ROOT_DIR/.npm-cache"
export npm_config_cache="$NPM_CACHE_DIR"
export npm_config_install_links="false"
REACT_VERSION="${1:-}"

if [ -z "$REACT_VERSION" ]; then
  read -rp "Enter the React version to test (e.g. 18.2.0): " REACT_VERSION
fi

REACT_VERSION="$(echo "$REACT_VERSION" | xargs || true)"
if [ -z "$REACT_VERSION" ]; then
  echo "A React version is required to continue." >&2
  exit 1
fi

cd "$ROOT_DIR"

echo "<><><><> Building $PACKAGE_NAME..."
npm run build

echo "<><><><> Packing $PACKAGE_NAME for the test site..."
rm -f "$TEST_SITE_DIR"/yext-search-ui-react-*.tgz
mkdir -p "$NPM_CACHE_DIR"
TARBALL_PATH=$(npm pack --pack-destination "$TEST_SITE_DIR" | tail -n 1)

cd "$TEST_SITE_DIR"
TARBALL_FILE="$(basename "$TARBALL_PATH")"
echo "<><><><> Uninstalling any existing $PACKAGE_NAME from the test site to remove symlink..."
npm uninstall "$PACKAGE_NAME" >/dev/null 2>&1 || true
echo "<><><><> Setting react and react-dom dependencies to version $REACT_VERSION..."
node - "$TEST_SITE_DIR" "$REACT_VERSION" <<'NODE'
const fs = require('fs');
const path = require('path');
const [, , testSiteDir, reactVersion] = process.argv;
const pkgPath = path.join(testSiteDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.dependencies = pkg.dependencies || {};
pkg.dependencies.react = reactVersion;
pkg.dependencies['react-dom'] = reactVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE
echo "<><><><> Installing test site dependencies with React ${REACT_VERSION}..."
npm install
echo "<><><><> Installing $PACKAGE_NAME from $TARBALL_FILE..."
npm install "./$TARBALL_FILE"
echo "<><><><> $PACKAGE_NAME installed in the test site from local tarball."
echo "<><><><> Please take the following steps to verify compatibility in the test site:"
echo "1. Navigate to the test site directory: cd $TEST_SITE_DIR"
echo "2. Start the test site: npm start"
echo "3. Open your browser and go to http://localhost:3000 to verify the application is working as expected."
echo "4. When you are done, run 'npm run test-site:reset-local' from the repo root to delete the tarball, restore the file:.. dependency, and reinstall the test site (this also restores the default React symlinks)."
