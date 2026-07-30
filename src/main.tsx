import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initTelemetry } from './utils/telemetry';

// Suppress browser extension message channel & runtime connection errors
if (typeof window !== 'undefined') {
  const isExtensionError = (msg?: string) => {
    if (!msg || typeof msg !== 'string') return false;
    return (
      msg.includes('A listener indicated an asynchronous response') ||
      msg.includes('Could not establish connection') ||
      msg.includes('Receiving end does not exist') ||
      msg.includes('runtime.lastError')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && isExtensionError(event.reason.message || String(event.reason))) {
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    if (isExtensionError(event.message)) {
      event.preventDefault();
    }
  });
}

// Initialize Telemetry Engine (Zero UX overhead)
initTelemetry(import.meta.env.VITE_POSTHOG_KEY, import.meta.env.VITE_GA4_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
