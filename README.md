# search-react-ui

<div>
  <a href="https://npmjs.org/package/@yext/search-react-ui">
    <img src="https://img.shields.io/npm/v/@yext/search-react-ui" alt="NPM version"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
  <a href='https://coveralls.io/github/yext/search-react-ui?branch=main'>
    <img src='https://coveralls.io/repos/github/yext/search-react-ui/badge.svg?branch=main' alt='Coverage Status' />
  </a>
</div>
<br>

A library of React Components for powering Yext Search integrations.

See the [full documentation](./docs/search-react-ui.md) here.

## Getting Started

If you are using NPM 7+, you can install the components with the following command:

```bash
npm install @yext/search-react-ui
```
The @yext/answers-headless-react peer dependency will be automatically installed.

If you are using NPM 6 or Yarn, you can install the library and its peer dependencies with this command:
```bash
npx install-peerdeps @yext/search-react-ui
```
The command will work with Yarn so long as NPM 6+ is installed on the machine.

Once the library and its peer dependencies are installed, the components can be rendered using React by placing them inside the `AnswersHeadlessProvider` with the appropriate credentials:

```tsx
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { SearchBar, UniversalResults } from '@yext/search-react-ui';

const config = {
  apiKey: '<apiKey>',
  experienceKey: '<experienceKey>',
  locale: 'en',
  experienceVersion: 'PRODUCTION',
}

function App() {
  return (
    <AnswersHeadlessProvider {...config}>
      <SearchBar />
      <UniversalResults />
    </AnswersHeadlessProvider>
  );
}

export default App;
```

To use the Component Library's Styling without adding Tailwind to your project, add the following import: 

```tsx
import '@yext/search-react-ui/bundle.css'
```