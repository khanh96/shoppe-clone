import React from 'react'
import { Helmet } from 'react-helmet-async'
interface HelmetSeoProps {
  title: string
  description: string
}

export default function HelmetSeo(props: HelmetSeoProps) {
  const { title, description } = props
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}
