// Global type declaration for Google Analytics gtag function
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    __analyticsClickTrackingInstalled?: boolean
  }
}

export {}
