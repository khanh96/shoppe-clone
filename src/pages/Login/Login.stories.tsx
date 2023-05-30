import type { Meta, StoryObj } from '@storybook/react'
import Login from './Login'
import { path } from 'src/constants/path'
import RegisterLayout from 'src/layouts/RegisterLayout'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Login> = {
  title: 'Layout/MainLayout/Pages/Login',
  component: Login,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const LoginPage: Story = {
  render: () => (
    <RegisterLayout>
      <Login />
    </RegisterLayout>
  )
}

LoginPage.parameters = {
  reactRouter: {
    routePath: path.login
    //routeParams: { nameId: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-id-60afb2c76ef5b902180aacba' }
    // routeHandle: 'Profile',
    // searchParams: { tab: 'activityLog' },
    // routeState: { fromPage: 'homePage' }
  }
}
