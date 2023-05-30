import type { Meta, StoryObj } from '@storybook/react'

import MainLayout from './MainLayout'
import ProductList from 'src/pages/ProductList'
import { path } from 'src/constants/path'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MainLayout> = {
  title: 'Layout/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Thành phần children trong layout'
    }
  }
} satisfies Meta<typeof MainLayout>

export default meta
type Story = StoryObj<typeof meta>

export const MainLayoutPage: Story = {}

export const HomePage: Story = {
  args: {
    children: <ProductList />
  }
}

HomePage.parameters = {
  reactRouter: {
    routePath: path.home
    //routeParams: { nameId: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-id-60afb2c76ef5b902180aacba' }
    // routeHandle: 'Profile',
    // searchParams: { tab: 'activityLog' },
    // routeState: { fromPage: 'homePage' }
  }
}
