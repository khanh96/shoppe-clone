import type { Meta, StoryObj } from '@storybook/react'

import ProductDetail from './ProductDetail'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProductDetail> = {
  title: 'Layout/MainLayout/Pages/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Thành phần children trong layout'
    }
  }
} satisfies Meta<typeof ProductDetail>

export default meta
type Story = StoryObj<typeof meta>

export const ProductDetailPage: Story = {
  args: {
    children: <ProductDetail />
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
