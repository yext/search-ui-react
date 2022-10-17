import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { FunctionComponent } from 'react';

const USE_LAYOUT_EFFECT_ERROR = /useLayoutEffect does nothing on the server/;
const originalConsoleError = console.error.bind(console.error);

export function testSSR(App: FunctionComponent) {
  const renderOnServer = () => renderToString(<App />);
  const container = document.body.appendChild(document.createElement('div'));
  const consoleErrorSpy = jest.spyOn(global.console, 'error')
    .mockImplementation((msg) => {
      /**
       * Caveat of SSR: useEffect and useLayoutEffect hooks do not run when
       * rendering on server.
       *
       * Suppress useLayoutEffect warnings here since the mock window in jest test
       * environment made the workaround with isomorphic-layout-effect ineffective.
       */
      if (!msg.toString().match(USE_LAYOUT_EFFECT_ERROR)) {
        originalConsoleError(msg);
      }
    });

  // server render components to static markup
  container.innerHTML = renderOnServer();

  // hydrate a container whose HTML contents were rendered by ReactDOMServer
  render(<App />, { container, hydrate: true });
  expect(consoleErrorSpy).not.toBeCalledWith(
    expect.stringContaining('Warning: Prop `%s` did not match. Server: %s Client: %s%s'),
    'id',
    expect.anything(),
    expect.anything(),
    expect.anything()
  );
}