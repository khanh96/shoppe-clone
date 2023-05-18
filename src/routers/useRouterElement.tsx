import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import ProductList from '../pages/ProductList'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'
import RegisterLayout from 'src/layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constants/path'
import ProductDetail from 'src/pages/ProductDetail'
import Cart from 'src/pages/Cart'
import CartLayout from 'src/layouts/CartLayout'
import HistoryPurchase from 'src/pages/User/pages/HIstoryPurchase'
import Profile from 'src/pages/User/pages/Account/pages/Profile'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/pages/Account/pages/ChangePassword'
import Account from 'src/pages/User/pages/Account'
import NotFound from 'src/pages/NotFound'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  console.log('1')
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouterElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },
            {
              path: path.userAccount,
              element: <Account />,
              children: [
                {
                  path: path.profile,
                  element: <Profile />
                },
                {
                  path: path.changePassword,
                  element: <ChangePassword />
                }
              ]
            }
          ]
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
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
