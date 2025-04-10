import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactNode } from 'react';

export const customRender = (ui: ReactNode) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(ui),
  };
};
