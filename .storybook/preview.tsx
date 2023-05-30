import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Preview } from '@storybook/react'
import { AppContextProvider } from '../src/contexts/app.context'
import App from '../src/App'
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { withRouter } from 'storybook-addon-react-router-v6'
import '../src/index.css'
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false // Khi call api bị lỗi thì sẽ không gọi lại
    },
    mutations: {
      retry: false
    }
  },
  // Tắt log error khi test.
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => null
  }
})
const helmetContext = {}

export const decorators = [
  withRouter,
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ErrorBoundary>
          <HelmetProvider context={helmetContext}>
            <Story />
            <ToastContainer />
          </HelmetProvider>
        </ErrorBoundary>
      </AppContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
]

export default preview
