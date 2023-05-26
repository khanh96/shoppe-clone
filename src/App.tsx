import { useContext, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './App.css'
import useRouterElement from './routers/useRouterElement'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { PageNotFoundEventTarget } from './utils/utils'
import { path } from './constants/path'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const helmetContext = {}

function App() {
  const routeElements = useRouterElement()
  // const navigate = useNavigate()
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

  // useEffect(() => {
  //   PageNotFoundEventTarget.addEventListener('pageNotFound', () => {
  //     navigate({ pathname: path.notFound })
  //   })
  //   return () => {
  //     LocalStorageEventTarget.removeEventListener('pageNotFound', () => {
  //       navigate({ pathname: path.notFound })
  //     })
  //   }
  // }, [navigate])ß

  return (
    <>
      <ErrorBoundary>
        <HelmetProvider context={helmetContext}>
          {routeElements}
          <ToastContainer />
        </HelmetProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
