import { waitFor, render, screen, type Matcher, fireEvent } from '@testing-library/react'
import { path } from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/utilsTest'
import { describe, test, expect, beforeAll } from 'vitest'

describe('Login', () => {
  let emailInputElement: HTMLInputElement
  let passwordInputElement: HTMLInputElement
  let loginBtnElement: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ router: path.login })
    await waitFor(() => {
      const inputNode = screen.getByPlaceholderText('Email')
      const textPlaceholder = inputNode.getAttribute('placeholder')
      expect(screen.queryByPlaceholderText(textPlaceholder as Matcher)).toBeInTheDocument()
    })
    emailInputElement = document.querySelector('input[type="email"]') as HTMLInputElement
    passwordInputElement = document.querySelector('input[type="password"]') as HTMLInputElement
    loginBtnElement = document.querySelector('button[type="submit"]') as HTMLButtonElement
  })
  test('Hiển thị lỗi required khi không nhập gì', async () => {
    fireEvent.click(loginBtnElement)

    await waitFor(() => {
      expect(screen.queryByText('Trường Email phải bắt buộc')).toBeVisible()
      expect(screen.queryByText('Trường Password phải bắt buộc')).toBeVisible()
    })
  })

  test('Hiển thị validate lỗi khi nhập value sai', async () => {
    // await logScreen()
    // WAY-1:
    //const EmailInputElement = document.querySelector('input[type="email"]') as Element
    //const PasswordInputElement = document.querySelector('input[type="password"]') as Element
    // fireEvent.change(EmailInputElement, {
    //   target: {
    //     value: 'abcxyz'
    //   }
    // })
    // fireEvent.change(PasswordInputElement, {
    //   target: {
    //     value: '123'
    //   }
    // })

    //WAY-2:
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'abcxyz'
      }
    })
    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: '123'
      }
    })
    fireEvent.click(loginBtnElement)
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeVisible()
      expect(screen.queryByText('Độ dài password từ 6 - 160 ký tự')).toBeVisible()
    })
  })

  test('Không hiển thị lỗi và login thành cồng', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'user-02@gmail.com'
      }
    })
    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: '123456'
      }
    })
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài password từ 6 - 160 ký tự')).toBeFalsy()
    })
    fireEvent.submit(loginBtnElement)

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Homepage | Shoppe Clone')
    })

    await logScreen()
  })
})
