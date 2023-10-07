import { Navigate } from 'react-router-dom'

export const publicRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        lazy: async () => {
          const { Login } = await import('../features/login/components/Layout')
          return { Component: Login }
        },
      },
      {
        path: '*',
        element: <Navigate to="login" />,
      },
    ],
  },
]
