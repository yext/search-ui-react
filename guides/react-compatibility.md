# React Compatibility Testing

The root package installs React 19 so we can run Storybook and exercise the React 19 entry points. When `test-site/package.json` depends on `"@yext/search-ui-react": "file:.."` (see test-site/package.json:5-13) npm keeps a symlink directly into the workspace. That symlink exposes the root `node_modules`, so the library always resolves `react/jsx-runtime` to the React 19 copy even if `test-site` has React 18 installed. Rendering a React 19 element with React 18 produces the `Objects are not valid as a React child` error you observed.

To reproduce the way customers consume the package, install the workspace from a tarball instead of the live symlink:

1. Run `npm run test-site:install-local` (you can optionally pass the desired React version as the first argument, e.g. `npm run test-site:install-local 18.2.0`). The script builds the package, packs it, prompts for which React release to test, updates `react` and `react-dom` in `test-site/package.json`, runs `npm install`, and finally installs the freshly built tarball.
2. Start the test site or run its tests. Because the tarball does not contain React, the dependency resolves to the version you selected in step 1, so you can confirm compatibility with React 18 (or any other supported major).
3. When you are finished, run `npm run test-site:reset-local`. That script deletes the generated tarball, restores the `file:..` dependency plus the `react`/`react-dom` symlinks to the root `node_modules`, and runs `npm install` so the test site is ready for normal development again.
