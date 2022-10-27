import { ReactElement } from 'react';

type Renderer = (reactElement: ReactElement, container: Element) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let reactDomClientPromise: Promise<any> = Promise.reject();
try {
  // This must be put into a separate variable, otherwise webpack will
  // try to statically resolve the dynamic import and fail to do so
  const importString = 'react-dom/client';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore we support both react-dom 17 and 18, but need this
  // ts-ignore since react-dom/client does not exist in react-dom 17
  reactDomClientPromise = import(importString);
} catch (e) {}

const rendererPromiseWithFallback: Promise<Renderer> = reactDomClientPromise
  .then(reactDomClient => {
    const { createRoot } = reactDomClient;
    const render: Renderer = (reactElement, container) => {
      const root = createRoot(container);
      root.render(reactElement);
    };
    return render;
  })
  .catch(async () => {
    const { render } = await import('react-dom');
    return render;
  });

/**
 * Renders the given reactElement into the container.
 * Will use createRoot and root.render over ReactDOM.render when possible.
 */
const renderToContainer = async (
  reactElement: ReactElement,
  container: HTMLElement
): Promise<void> => {
  const render = await rendererPromiseWithFallback;
  await render(reactElement, container);
};

export default renderToContainer;