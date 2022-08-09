import { axeOptionsConfig } from 'axe-playwright';

export const runOnly: axeOptionsConfig['axeOptions']['runOnly'] = {
  type: 'tag',
  values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
};
