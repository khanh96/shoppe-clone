import { useContext, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './App.css'
import useRouterElement from './routers/useRouterElement'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext, AppContextProvider } from './contexts/app.context'
import { PageNotFoundEventTarget } from './utils/utils'
import { path } from './constants/path'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0 // Khi call api bị lỗi thì sẽ gọi lại 0 lần
    }
  }
})
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
  // }, [navigate])

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ErrorBoundary>
          <HelmetProvider context={helmetContext}>
            {routeElements}
            <ToastContainer />
          </HelmetProvider>
        </ErrorBoundary>
      </AppContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
