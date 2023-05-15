import React from 'react'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { NameSchemaType, nameSchema } from 'src/utils/rules'
import { omit } from 'lodash'
import { path } from 'src/constants/path'

type FormData = NameSchemaType

export default function useSearchProduct() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const { name } = data
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: name }, ['order', 'sort_by'])
      : { ...queryConfig, name: name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmitSearch }
}
