import { createRoot } from 'react-dom/client';
import ZapWars from './components/ZapWars';
import React from 'react';

// Smart Widget SDK Registration
export const registerZapWarsWidget = () => {
  // Check if smart widget handler is available
  if (typeof window !== 'undefined' && window.smartWidgetHandler) {
    window.smartWidgetHandler.registerRenderer('zapwars', (data, container) => {
      // Clear container
      container.innerHTML = '';
      
      // Create React root and render ZapWars
      const root = createRoot(container);
      root.render(React.createElement(ZapWars));
      
      console.log('🎮 ZapWars Widget Registered and Rendered');
    });
  } else {
    console.warn('Smart Widget Handler not found. Make sure YakiHonne SDK is loaded.');
  }
};

// Auto-register when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM and potential SDK to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(registerZapWarsWidget, 100);
    });
  } else {
    setTimeout(registerZapWarsWidget, 100);
  }
}

// Export for manual registration
export default registerZapWarsWidget;