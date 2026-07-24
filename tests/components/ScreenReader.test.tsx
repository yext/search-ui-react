import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { ScreenReader } from '../../src/components/ScreenReader';

describe('ScreenReader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates a stable live region after it has mounted', () => {
    const { rerender } = render(
      <ScreenReader
        announcementText='first announcement'
      />
    );
    const liveRegion = screen.getByRole('status');

    expect(liveRegion).toBeEmptyDOMElement();
    act(() => jest.advanceTimersByTime(0));
    expect(liveRegion).toHaveTextContent('first announcement');

    rerender(
      <ScreenReader
        announcementText='second announcement'
      />
    );
    expect(screen.getByRole('status')).toBe(liveRegion);
    expect(liveRegion).toBeEmptyDOMElement();

    act(() => jest.advanceTimersByTime(0));
    expect(liveRegion).toHaveTextContent('second announcement');
  });

  it('only renders the newest pending announcement', () => {
    const { rerender } = render(
      <ScreenReader
        announcementText='stale announcement'
        announcementDelayMs={800}
      />
    );

    act(() => jest.advanceTimersByTime(400));
    rerender(
      <ScreenReader
        announcementText='latest complete announcement'
        announcementDelayMs={800}
      />
    );
    act(() => jest.advanceTimersByTime(800));

    expect(screen.getByRole('status')).toHaveTextContent('latest complete announcement');
    expect(screen.queryByText('stale announcement')).not.toBeInTheDocument();
  });
});
