import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-center"
      richColors
      toastOptions={{
        style: {
          background: 'hsl(220 20% 12%)',
          border: '1px solid hsl(220 15% 20%)',
          color: 'hsl(0 0% 98%)',
        },
      }}
    />
  </StrictMode>,
)
