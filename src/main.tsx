import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Routes from './routes/Routes'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();
import { ReactQueryDevtools } from 'react-query/devtools'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
