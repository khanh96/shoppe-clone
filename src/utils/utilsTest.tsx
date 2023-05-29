import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen, waitFor, type waitForOptions } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { AppContextProvider, getInitialAppContext } from 'src/contexts/app.context'
import { expect } from 'vitest'

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout: timeout
    }
  )

  screen.debug(body, 999999)
}

// Custom config queryClient
const createWrapperReactQuery = () => {
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
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return Provider
}

const ProviderReactQuery = createWrapperReactQuery()

export const renderWithRouter = ({ router = '/' } = {}) => {
  const user = userEvent.setup()
  window.history.pushState({}, 'Test page', router)
  console.log('=======>', router)
  const defaultAppContext = getInitialAppContext()
  return {
    ...render(
      <ProviderReactQuery>
        <AppContextProvider defaultValue={defaultAppContext}>
          <App />
        </AppContextProvider>
      </ProviderReactQuery>,
      {
        wrapper: BrowserRouter
      }
    ),
    user: user
  }
}
