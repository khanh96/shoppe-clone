import { useContext, useEffect } from 'react'
import './App.css'
import useRouterElement from './routers/useRouterElement'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouterElement()
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

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
