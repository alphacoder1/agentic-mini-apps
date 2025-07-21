import React, { useEffect } from 'react';
import ZapWars from './components/ZapWars';
import { registerZapWarsWidget } from './smart-widget-sdk';

function App() {
  useEffect(() => {
    // Mock the Smart Widget Handler for development
    if (!window.smartWidgetHandler) {
      window.smartWidgetHandler = {
        registerRenderer: (type: string, renderer: Function) => {
          console.log(`🔌 Smart Widget Registered: ${type}`);
          
          // For development, we can test the renderer
          if (type === 'zapwars') {
            console.log('✅ ZapWars widget renderer is ready');
          }
        }
      };
    }

    // Register the widget
    registerZapWarsWidget();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Smart Widget Development
          </h1>
          <p className="text-gray-600">
            ZapWars Widget for YakiHonne/Nostr Feeds
          </p>
        </div>
        
        {/* Widget Preview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Widget Preview
          </h2>
          <ZapWars />
        </div>

        {/* Integration Instructions */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Integration Instructions
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>1.</strong> Import the widget SDK: <code className="bg-gray-200 px-2 py-1 rounded">import registerZapWarsWidget from './smart-widget-sdk'</code>
            </p>
            <p>
              <strong>2.</strong> Register the widget: <code className="bg-gray-200 px-2 py-1 rounded">registerZapWarsWidget()</code>
            </p>
            <p>
              <strong>3.</strong> Use in feeds: <code className="bg-gray-200 px-2 py-1 rounded">smartWidgetHandler.registerRenderer('zapwars', ...)</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;