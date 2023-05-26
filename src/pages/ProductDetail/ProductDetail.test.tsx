import { waitFor, screen } from '@testing-library/react'
import { path } from 'src/constants/path'
import { delay, logScreen, renderWithRouter } from 'src/utils/utilsTest'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Product Detail', () => {
  it('render product detail', async () => {
    renderWithRouter({ router: '/Điện-thoại-OPPO-A12-3GB32GB--Hàng-chính-hãng-id-60afb2426ef5b902180aacb9' })
    await delay(1000)
    expect(document.body).toMatchSnapshot()
  })
})
