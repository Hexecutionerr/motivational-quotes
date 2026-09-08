// Centralized Analytics service to track events, page views, and user interactions.
// Easily routes telemetry to GA4, Plausible, or Microsoft Clarity.

export const analytics = {
  // Page view tracker
  trackPageView: (path) => {
    console.log(`📊 [Analytics] Page View: ${path}`);
    
    // Google Analytics Integration
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title
      });
    }

    // Plausible Integration
    if (window.plausible) {
      window.plausible('pageview', { u: path });
    }
  },

  // Custom Event tracker (e.g. tool generation)
  trackEvent: (eventName, params = {}) => {
    console.log(`📊 [Analytics] Event: ${eventName}`, params);

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }

    // Plausible
    if (window.plausible) {
      window.plausible(eventName, { props: params });
    }

    // Microsoft Clarity
    if (window.clarity) {
      window.clarity('event', eventName, params);
    }
  }
};
