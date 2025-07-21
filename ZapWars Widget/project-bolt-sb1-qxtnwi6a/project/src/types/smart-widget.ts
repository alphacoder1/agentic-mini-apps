export interface SmartWidgetData {
  type: string;
  content: any;
}

export interface SmartWidgetHandler {
  registerRenderer: (type: string, renderer: (data: SmartWidgetData, container: HTMLElement) => void) => void;
}

declare global {
  interface Window {
    smartWidgetHandler: SmartWidgetHandler;
    webln?: {
      enable: () => Promise<void>;
      sendPayment: (invoice: string) => Promise<{ preimage: string }>;
    };
  }
}