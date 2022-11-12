export {};

declare global {
  interface Window {
    dataLayer: {
      push: (parameters: { event: string; [key: string]: unknown }) => void;
    };
  }
}
