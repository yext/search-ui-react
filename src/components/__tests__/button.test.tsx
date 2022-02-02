import { render } from '@testing-library/react';
import { Button } from '../Button';

it('test button', async () => {
  const { container } = render(
    <Button label='this is a button'/>
  );
  const button = container.getElementsByClassName('button')[0];
  expect(button?.textContent).toBe('this is a button');
});
