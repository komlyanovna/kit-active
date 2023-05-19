import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import App from './App'
import { FormSignUp } from './components/FormSignUp'
import { FormSignin } from './components/FormSignin'
import { Closet } from './components/Closet'
import { CardFile } from './CardFile'

export const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <FormSignUp />,
      },
      {
        path: '/signin',
        element: <FormSignin />,
      },
      {
        path: '/closet',
        element: <Closet />,
      },
      {
        path: '/closet/:id',
        element: <CardFile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>,
  // </React.StrictMode>,
)
