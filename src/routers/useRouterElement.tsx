import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'
import RegisterLayout from 'src/layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import Profile from 'src/pages/Profile'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constants/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouterElement() {
  const element = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])

  return element
}
