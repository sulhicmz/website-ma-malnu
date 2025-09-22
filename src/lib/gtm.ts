// lib/gtm.ts
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    })
  }
}

// Example event tracking functions
export const trackPPDBFormSubmit = (jurusan: string) => {
  trackEvent('ppdb_form_submit', {
    jurusan_pilihan: jurusan,
    timestamp: new Date().toISOString(),
  })
}

export const trackWhatsAppClick = (context: string) => {
  trackEvent('whatsapp_click', {
    context: context,
    timestamp: new Date().toISOString(),
  })
}