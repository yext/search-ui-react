import './index.css';
import { AnswersCoreDecorator } from '../tests/__fixtures__/core/AnswersCore';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true
  },
  a11y: {
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      }
    }
  }
};

// Add the decorator to all stories
export const decorators = [AnswersCoreDecorator];