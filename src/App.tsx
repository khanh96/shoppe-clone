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

/**
 * Khi url thay đổi thì các component nào dùng các hook như
 * useRoutes, useParmas, useSearchParams,...
 * sẽ bị re-render.
 * Ví dụ component `App` dưới đây bị re-render khi mà url thay đổi
 * vì dùng `useRouteElements` (đây là customhook của `useRoutes`)
 */

function App() {
  console.log('APP')
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
