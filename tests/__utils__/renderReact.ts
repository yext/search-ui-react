import React from 'react';
import ReactDOM from 'react-dom';

export function renderReact(children: JSX.Element, container: Element) {
  try {
    if (!React.version.startsWith('18')) {
      throw new Error('Using React <18. Skip createRoot rendering.');
    }
    // @ts-ignore
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(container);
      root.render(children);
    });
  } catch {
    ReactDOM.render(children, container);
  }
}
