const SITE_NAME = 'VladDom'
const DEFAULT_SITE_URL = 'https://vladdom.ru'

export function getSiteUrl() {
  const url = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL
  return url.replace(/\/$/, '')
}

export function truncate(text, max) {
  if (!text) return ''
  const value = String(text).trim()
  if (value.length <= max) return value
  return `${value.slice(0, max - 1)}…`
}

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export const ROUTE_SEO = {
  Home: {
    title: 'Недвижимость Владивостока — квартиры и дома | VladDom',
    description:
      'VladDom — подбор квартир, апартаментов и домов во Владивостоке. Актуальный каталог, ипотека и сопровождение сделки.',
    robots: 'index,follow',
  },
  Catalog: {
    title: 'Каталог недвижимости Владивостока | VladDom',
    description:
      'Квартиры, апартаменты и загородные дома во Владивостоке. Фильтры по району, цене и площади — найдите объект под ваш бюджет.',
    robots: 'index,follow',
  },
  Property: {
    title: 'Объект недвижимости | VladDom',
    description: 'Подробная информация об объекте недвижимости во Владивостоке на сайте VladDom.',
    robots: 'index,follow',
  },
  Favorites: {
    title: 'Избранное | VladDom',
    description: 'Сохранённые объекты недвижимости VladDom.',
    robots: 'noindex,nofollow',
  },
  News: {
    title: 'Новости рынка недвижимости | VladDom',
    description:
      'Аналитика цен, обзоры новостроек и полезные материалы о рынке недвижимости Владивостока.',
    robots: 'index,follow',
  },
  Contacts: {
    title: 'Контакты VladDom — офис во Владивостоке',
    description:
      'Адрес офиса, телефон и режим работы VladDom. Свяжитесь с нами для консультации по недвижимости.',
    robots: 'index,follow',
  },
  Request: {
    title: 'Оставить заявку | VladDom',
    description:
      'Оставьте заявку на подбор недвижимости во Владивостоке. Менеджер свяжется с вами в ближайшее время.',
    robots: 'index,follow',
  },
  Auth: {
    title: 'Вход и регистрация | VladDom',
    description: 'Личный кабинет VladDom: вход и регистрация пользователя.',
    robots: 'noindex,nofollow',
  },
  MyApplications: {
    title: 'Мои заявки | VladDom',
    description: 'Список ваших заявок на подбор недвижимости VladDom.',
    robots: 'noindex,nofollow',
  },
  NotFound: {
    title: 'Страница не найдена | VladDom',
    description: 'Запрашиваемая страница не найдена. Перейдите на главную или в каталог VladDom.',
    robots: 'noindex,nofollow',
  },
}

export function applyRouteSeo(to, overrides = {}) {
  const base = getSiteUrl()
  const routeMeta = ROUTE_SEO[to.name] || ROUTE_SEO.Home
  const title = truncate(overrides.title || routeMeta.title, 60)
  const description = truncate(overrides.description || routeMeta.description, 160)
  const robots = overrides.robots || routeMeta.robots || 'index,follow'
  const canonicalPath = overrides.canonicalPath ?? to.fullPath.split('?')[0]
  const canonical = `${base}${canonicalPath === '/' ? '' : canonicalPath}`

  document.title = title
  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', robots)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:locale', 'ru_RU')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertLink('canonical', canonical)
}

export function buildPropertySeo(property) {
  if (!property) return {}
  const title = truncate(
    `${property.title}, ${property.address} — купить | VladDom`,
    60
  )
  const description = truncate(
    property.description ||
      `${property.title} по адресу ${property.address}. Площадь ${property.area} м², цена ${property.price} ₽. Подбор и сделка с VladDom.`,
    160
  )
  return { title, description, canonicalPath: `/property/${property.id}` }
}
