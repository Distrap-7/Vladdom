/** Подключение Яндекс.Вебмастер и Google Search Console через .env */
export function initSearchConsoleVerification() {
  const yandex = import.meta.env.VITE_YANDEX_VERIFICATION?.trim()
  const google = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()

  if (yandex) {
    let el = document.querySelector('meta[name="yandex-verification"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'yandex-verification')
      document.head.appendChild(el)
    }
    el.setAttribute('content', yandex)
  }

  if (google) {
    let el = document.querySelector('meta[name="google-site-verification"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'google-site-verification')
      document.head.appendChild(el)
    }
    el.setAttribute('content', google)
  }
}
