# answers-react-components

<div>
  <a href="https://npmjs.org/package/@yext/answers-react-components">
    <img src="https://img.shields.io/npm/v/@yext/answers-react-components" alt="NPM version"/>
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
</div>
<br>

A library of React Components for powering Yext Answers integrations.

[Full Documentation](./docs/answers-react-components.md)

## Getting Started

If you are using NPM 7+, you can install the components with the following command:

```bash
npm install @yext/answers-react-components
```
The React and the @yext/answers-headless-react peer dependencies will be automatically installed.

If you are using NPM 5, 6, or Yarn, you can install the library and its peer dependencies with this command:
```bash
npx install-peerdeps @yext/answers-react-components
```
The command will work with Yarn so long as NPM 5+ is installed on the machine.
Once the library and its peer dependencies are installed, the components can be rendered using React by placing them inside the `AnswersHeadlessProvider`:

```tsx
const config = {
  apiKey: '<apiKey>',
  experienceKey: '<experienceKey>',
  locale: 'en',
  experienceVersion: 'STAGING',
  businessId: 123456
}

function App() {
  return (
    <AnswersHeadlessProvider {...config}>
      <SearchBar/>
      <UniversalResults/>
    </AnswersHeadlessProvider>
  );
}
```