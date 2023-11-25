import { Wrapper } from '@googlemaps/react-wrapper';
import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { handlers } from '../src/mocks/handlers';
import { GlobalStyle } from '../src/style/GlobalStyle';

initialize();

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    msw: {
      handlers: [...handlers],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        iphone6: {
          name: 'iPhone SE',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        ipad: {
          name: 'IPad',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
        {
          name: 'black',
          value: '#000',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      const map = document.getElementById('map');

      if (map) {
        map.style.visibility = 'hidden';
      }

      return (
        <React.Fragment>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <MemoryRouter initialEntries={['/']}>
              <Wrapper
                apiKey={
                  process.env.NODE_ENV === 'production'
                    ? process.env.GOOGLE_MAPS_API_KEY_PROD!
                    : process.env.GOOGLE_MAPS_API_KEY_DEV!
                }
                libraries={['marker']}
              >
                <Story />
              </Wrapper>
            </MemoryRouter>
          </QueryClientProvider>
        </React.Fragment>
      );
    },
    mswDecorator,
  ],
};

export default preview;
