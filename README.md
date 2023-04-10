# search-ui-react

<div>
  <a href="https://npmjs.org/package/@yext/search-ui-react">
    <img src="https://img.shields.io/npm/v/@yext/search-ui-react" alt="NPM version"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
  <a href='https://coveralls.io/github/yext/search-ui-react?branch=main'>
    <img src='https://coveralls.io/repos/github/yext/search-ui-react/badge.svg?branch=main' alt='Coverage Status' />
  </a>
</div>
<br>

A library of React Components for powering Yext Search integrations.

See the [full documentation](./docs/search-ui-react.md) here.

## Getting Started

If you are using NPM 7+, you can install the components with the following command:

```bash
npm install @yext/search-ui-react
```
The @yext/search-headless-react peer dependency will be automatically installed.

If you are using NPM 6 or Yarn, you can install the library and its peer dependencies with this command:
```bash
npx install-peerdeps @yext/search-ui-react
```
The command will work with Yarn so long as NPM 6+ is installed on the machine.

Once the library and its peer dependencies are installed, our React Components should be nested inside the `SearchHeadlessProvider`. `SearchHeadlessProvider` requires a `SearchHeadless` instance, which is created using `provideHeadless(...)` with the appropriate credentials:

```tsx
import { provideHeadless, SearchHeadlessProvider } from '@yext/search-headless-react';
import { SearchBar, UniversalResults, VerticalConfigMap } from '@yext/search-ui-react';
import { v4 as uuidv4 } from 'uuid';

const config = {
  apiKey: '<apiKey>',
  experienceKey: '<experienceKey>',
  locale: 'en',
  experienceVersion: 'PRODUCTION',
}

const searcher = provideHeadless(config);

searcher.setSessionTrackingEnabled(true);
let sessionId = window.sessionStorage.getItem('sessionId');
if (!sessionId) {
  sessionId = uuidv4();
  window.sessionStorage.setItem('sessionId', sessionId);
}
searcher.setSessionId(sessionId);

const verticalConfigMap: VerticalConfigMap = {
  help_articles: {
    label: "Help Articles"
  }
}

function App() {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <SearchBar />
      <UniversalResults verticalConfigMap={verticalConfigMap}/>
    </SearchHeadlessProvider>
  );
}

export default App;
```

To use the Component Library's Styling without adding Tailwind to your project, add the following import: 

```tsx
import '@yext/search-ui-react/bundle.css'
```

## Compatibility Notes

This library and its dependencies use optional chaining and other modern TS syntax that is not inherently supported by Webpack <5 (e.g. via `create-react-app@4`). Additional Babel plugins are needed for transpiling if using legacy versions.