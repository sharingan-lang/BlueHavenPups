import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from '@/router';
import '@fontsource-variable/besley/wght.css';
import '@fontsource-variable/besley/wght-italic.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import App from './App';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter>
      <App />
    </AppRouter>
  </StrictMode>,
);
