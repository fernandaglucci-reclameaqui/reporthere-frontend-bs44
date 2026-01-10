import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

console.log("Main.jsx executing...");
const rootElement = document.getElementById('root');
console.log("Root element:", rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
      <App />
  )
} else {
  console.error("Root element not found!");
} 