import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react' // sử dụng thư viện này để render trên nodejs. Vì reactjs render trên client
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import { logScreen, renderWithRouter } from './utils/utilsTest'
import { path } from './constants/path'

expect.extend(matchers)

describe('APP', () => {
  test('Test render app and navigate page', async () => {
    render(<App />, { wrapper: BrowserRouter })
    const { user } = renderWithRouter()

    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // TEST: Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Homepage | Shoppe Clone')
    })
    // xác minh nội dung trang cho tuyến đường dự kiến sau khi điều hướng
    await user.click(screen.getByText(/login/i))
    // Verify chuyển sang trang login
    await waitFor(() => {
      // Tìm text có trong trang web k?
      expect(screen.queryByText(/Bạn mới biết đến Shopee?/i)).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Login | Shoppe Clone')
    })

    // Cú pháp debug unit test
    // screen.debug(document.body.parentElement as HTMLElement, 99999)
  })
  // TEST: người dùng có về được trang 404 not found khi vào 1 url không tồn tại
  test('Test về trang not found', async () => {
    const badRoute = '/abc/xyz'
    renderWithRouter({ router: badRoute })
    // render(
    //   <MemoryRouter initialEntries={[badRoute]}>
    //     <App />
    //   </MemoryRouter>
    // )
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })

    // await logScreen()
  })
  // TEST: test người dùng nhập url vào 1 trang bất kỳ vd: nhập vào url register
  test('Test render register', async () => {
    renderWithRouter({ router: path.register })
    // window.history.pushState({}, 'Test page register', path.register)
    // render(<App />, {
    //   wrapper: BrowserRouter
    // })
    // render(
    //   <MemoryRouter initialEntries={[path.register]}>
    //     <App />
    //   </MemoryRouter>
    // )
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản Shopee?/i)).toBeInTheDocument()
    })

    // await logScreen()
  })
})
