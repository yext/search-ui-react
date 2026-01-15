import React from 'react';
import ReactDOM from 'react-dom';

type LegacyReactDOM = {
  render?: (element: React.JSX.Element, container: Element) => void
};

const legacyReactDOM = ReactDOM as LegacyReactDOM;

const reactMajorVersion = Number(React.version.split('.')[0]);
const supportsCreateRoot = !Number.isNaN(reactMajorVersion) && reactMajorVersion >= 18;

export function renderReact(children: React.JSX.Element, container: Element) {
  if (supportsCreateRoot) {
    import('react-dom/client')
      .then(({ createRoot }) => {
        const root = createRoot(container);
        root.render(children);
      })
      .catch(() => {
        legacyReactDOM.render?.(children, container);
      });
    return;
  }

  legacyReactDOM.render?.(children, container);
}
