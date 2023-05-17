import React, { useRef } from 'react'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'
import config from 'src/constants/config'
import { FormData } from 'src/pages/User/pages/Account/pages/Profile/Profile'

interface InputFileProps {
  onChange?: (file?: File) => void
  errorMessage?: string
  setError: UseFormSetError<FormData>
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function InputFile({ onChange, setError, errorMessage, setFile }: InputFileProps) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    inputFileRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal?.type.includes('image'))) {
      setError('avatar', {
        message: 'Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG'
      })
      setFile(undefined)
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={inputFileRef}
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        type='button'
        onClick={handleUpload}
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
      <div className='mt-3 text-gray-400'>
        <div>Dụng lượng file tối đa 1 MB</div>
        <div>Định dạng:.JPEG, .PNG</div>
      </div>
      <div className='mt-3'>
        <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errorMessage}</div>
      </div>
    </>
  )
}
