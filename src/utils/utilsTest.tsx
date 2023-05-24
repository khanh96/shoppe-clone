import { screen, waitFor, type waitForOptions } from '@testing-library/dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { expect } from 'vitest'

const delay = (time: number) => {
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

  screen.debug(body, 99999999)
}

export const renderWithRouter = ({ router = '/' } = {}) => {
  const user = userEvent.setup()
  window.history.pushState({}, 'Test page', router)
  return {
    ...render(<App />, {
      wrapper: BrowserRouter
    }),
    user: user
  }
}
