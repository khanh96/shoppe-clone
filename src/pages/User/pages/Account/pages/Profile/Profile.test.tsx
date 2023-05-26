import { waitFor, screen } from '@testing-library/react'
import { path } from 'src/constants/path'
import { access_token_1h } from 'src/msw/auth.msw'
import { setAccessTokenToLS } from 'src/utils/auth'
import { logScreen, renderWithRouter } from 'src/utils/utilsTest'
import { describe, beforeEach, it, expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

describe('Profile', () => {
  it('Test hiển thị file profile', async () => {
    setAccessTokenToLS(access_token_1h)
    renderWithRouter({ router: path.profile })
    await waitFor(() => {
      expect(screen.queryByText(/My Profile?/i)).toBeInTheDocument()
    })
    // await logScreen()
  })
})
