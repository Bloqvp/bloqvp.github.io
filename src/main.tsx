import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import siteConfig from './config';
import App from './App';
import './styles/globals.css';

const { theme } = siteConfig;

const root = document.documentElement;
root.style.setProperty('--color-primary', theme.primaryColor);
root.style.setProperty('--color-bg', theme.backgroundColor);
root.style.setProperty('--color-btn', theme.buttonColor);
root.style.setProperty('--color-btn-text', theme.buttonTextColor);
if (theme.buttonBorderRadius) {
  root.style.setProperty('--radius-btn', theme.buttonBorderRadius);
}

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
