import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initTelemetry } from './utils/telemetry';

// Initialize Telemetry Engine (Zero UX overhead)
initTelemetry(import.meta.env.VITE_POSTHOG_KEY, import.meta.env.VITE_GA4_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
