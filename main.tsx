/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

// 1. Global unhandled rejection & window error prevention
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    // Prevent unhandled promise rejection error banners or crash overlays
    console.warn('Safely handled global promise rejection:', event.reason);
    event.preventDefault();
  });

  window.addEventListener('error', (event) => {
    // Intercept image load errors, speech errors or benign runtime exceptions
    console.warn('Safely handled window error event:', event.message || event.error);
  });
}

// 2. Safe navigator.clipboard wrapper for iframe & permission security
if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
  const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
  navigator.clipboard.writeText = async function (text: string): Promise<void> {
    try {
      await originalWriteText(text);
    } catch {
      // Fallback via document.execCommand if clipboard API is blocked or document not focused
      try {
        if (typeof document !== 'undefined') {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.setAttribute('readonly', '');
          textarea.style.position = 'fixed';
          textarea.style.top = '0';
          textarea.style.left = '0';
          textarea.style.opacity = '0';
          textarea.style.pointerEvents = 'none';
          document.body.appendChild(textarea);
          textarea.focus({ preventScroll: true });
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
      } catch {
        // Suppress fallback error
      }
    }
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
