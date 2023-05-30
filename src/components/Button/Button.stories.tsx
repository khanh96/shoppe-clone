import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import Button from './Button'
import { boolean } from 'yup'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    isLoading: false,
    children: 'Login',
    className: 'bg-red-500 px-2 py-4 text-center uppercase text-white hover:bg-red-600',
    disabled: false
  }
}

export const Register: Story = {
  args: {
    ...Primary.args,
    children: 'Register',
    className: 'w-full bg-red-500 px-2 py-4 text-center uppercase text-white hover:bg-red-600'
  }
}
