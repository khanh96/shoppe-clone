import './App.css'
import useRouterElement from './routers/useRouterElement'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const element = useRouterElement()
  return (
    <>
      {element}
      <ToastContainer />
    </>
  )
}

export default App
