import type { Meta, StoryObj } from '@storybook/react'

import ProductList from './ProductList'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProductList> = {
  title: 'Layout/MainLayout/Pages/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Thành phần children trong layout'
    }
  }
} satisfies Meta<typeof ProductList>

export default meta
type Story = StoryObj<typeof meta>

export const ProductDetailPage: Story = {
  args: {
    children: <ProductList />
  }
}

ProductDetailPage.parameters = {
  reactRouter: {
    routePath: '/:nameId',
    routeParams: { nameId: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-id-60afb2c76ef5b902180aacba' }
    // routeHandle: 'Profile',
    // searchParams: { tab: 'activityLog' },
    // routeState: { fromPage: 'homePage' }
  }
}
