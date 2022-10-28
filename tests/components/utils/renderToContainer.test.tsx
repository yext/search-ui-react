import renderToContainer from '../../../src/components/utils/renderToContainer';
import packageJson from '../../../package.json';

jest.mock('react-dom/client');
jest.mock('react-dom');

/**
 * This test needs to pass for all react-dom versions we support.
 */
it('can render a react component into native dom elements', async () => {
  const createRootRender = jest.fn();
  const createRootSpy = jest.spyOn(require('react-dom/client'), 'createRoot')
    .mockImplementation(() => ({ render: createRootRender }));
  const reactDomRenderSpy = jest.spyOn(require('react-dom'), 'render');

  const container = document.createElement('div');

  await renderToContainer(<span>test me</span>, container);
  const isReactDom18 = packageJson.devDependencies['react-dom'].match(/18\.\d*\.\d*/);
  expect(createRootSpy).toHaveBeenCalledTimes(isReactDom18 ? 1 : 0);
  expect(createRootRender).toHaveBeenCalledTimes(isReactDom18 ? 1 : 0);
  expect(reactDomRenderSpy).toHaveBeenCalledTimes(isReactDom18 ? 0 : 1);
});