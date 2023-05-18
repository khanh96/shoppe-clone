import { useContext, useEffect } from 'react'
import './App.css'
import useRouterElement from './routers/useRouterElement'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { PageNotFoundEventTarget } from './utils/utils'
import { Navigate, useNavigate } from 'react-router-dom'
import { path } from './constants/path'

function App() {
  const routeElements = useRouterElement()
  const navigate = useNavigate()
  const { resetAuth } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      resetAuth()
    })

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', () => {
        resetAuth()
      })
    }
  }, [resetAuth])

  useEffect(() => {
    PageNotFoundEventTarget.addEventListener('pageNotFound', () => {
      navigate({ pathname: path.notFound })
    })
    return () => {
      LocalStorageEventTarget.removeEventListener('pageNotFound', () => {
        navigate({ pathname: path.notFound })
      })
    }
  }, [navigate])

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
