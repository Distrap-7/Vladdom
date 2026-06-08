/**
 * Все .webp из src/ и src/assets/ подхватываются автоматически.
 * Имена файлов (без расширения) = ключи: img('glav'), img('hero'), …
 */
const fromAssets = import.meta.glob('../assets/**/*.webp', { eager: true, import: 'default' })
const fromSrcRoot = import.meta.glob('../*.webp', { eager: true, import: 'default' })

function fileKey(path) {
  const file = path.split('/').pop() || ''
  return file.replace(/\.webp$/i, '').toLowerCase()
}

const IMAGE_MAP = {}
for (const [path, url] of Object.entries({ ...fromAssets, ...fromSrcRoot })) {
  IMAGE_MAP[fileKey(path)] = url
}

const allUrls = Object.values(IMAGE_MAP)

export function img(name) {
  if (!name) return pick()
  const key = String(name).toLowerCase().replace(/\.webp$/i, '')
  return IMAGE_MAP[key] ?? pick(key)
}

function pick(prefer) {
  if (prefer && IMAGE_MAP[prefer]) return IMAGE_MAP[prefer]
  const priority = ['glav', 'hero', 'main', 'banner', '1_block']
  for (const p of priority) {
    if (IMAGE_MAP[p]) return IMAGE_MAP[p]
  }
  return allUrls[0] || ''
}

export function imgAny(...names) {
  for (const n of names) {
    const u = img(n)
    if (u) return u
  }
  return pick()
}

export const HERO_IMAGE = imgAny(
  'glav',
  'hero',
  'main',
  'banner',
  'главная',
  '1_block'
)
export const BUILDING_IMAGE = imgAny(
  'building',
  'zhk',
  'dom',
  'why',
  'portfolio',
  'здание',
  '2'
)
export const INTERIOR_IMAGE = imgAny('interior', 'team', 'kvartira', 'интерьер', '3')
export const SKY_IMAGE = imgAny('sky', 'form', 'contact-bg', 'contacts', 'небо', '4')
export const MAP_IMAGE = imgAny('map', '5')

export const PORTFOLIO_IMAGES = [
  imgAny('portfolio1', 'novostroyki', '6'),
  imgAny('portfolio2', 'vtorichka', '7'),
  imgAny('portfolio3', 'apart', '8'),
  imgAny('portfolio4', 'zagorod', '9'),
].filter(Boolean)

export const NEWS_IMAGES = [
  imgAny('news1', '10'),
  imgAny('news2', '11'),
  imgAny('news3', '12'),
].filter(Boolean)

/** Главное фото + 3 миниатюры в карточках каталога */
export const HOME_LISTING_KEYS = ['room', 'room_1', 'room_2', 'room_3']

export function getHomeListingImages() {
  return HOME_LISTING_KEYS.map((name) => img(name)).filter(Boolean)
}

export const HOME_LISTING_IMAGES = getHomeListingImages()

export function getPropertyImages(property) {
  if (property?.images?.length) {
    const resolved = property.images
      .map((src) => {
        if (typeof src !== 'string') return src
        if (src.startsWith('http') || src.startsWith('/')) return src
        return img(src.replace(/\.webp$/i, '')) || src
      })
      .filter(Boolean)
    if (resolved.length) return resolved
  }

  const homeListing = getHomeListingImages()
  if (homeListing.length) return homeListing

  if (property?.imageKey) {
    const keyed = img(property.imageKey)
    if (keyed) {
      const pool = allUrls.length ? allUrls : [keyed]
      const id = property?.id ?? 0
      const offset = (id * 2) % pool.length
      return [
        keyed,
        pool[(offset + 1) % pool.length],
        pool[(offset + 2) % pool.length],
        pool[(offset + 3) % pool.length],
      ]
    }
  }

  const pool = allUrls.length
    ? allUrls
    : [HERO_IMAGE, BUILDING_IMAGE, INTERIOR_IMAGE].filter(Boolean)

  const id = property?.id ?? 0
  const offset = (id * 2) % Math.max(pool.length, 1)
  return [
    pool[offset % pool.length],
    pool[(offset + 1) % pool.length],
    pool[(offset + 2) % pool.length],
    pool[(offset + 3) % pool.length],
  ].filter(Boolean)
}

export const DEFAULT_PROPERTY_IMAGES = getPropertyImages({ id: 1 })
export const ALL_IMAGES = IMAGE_MAP

if (import.meta.env.DEV && !allUrls.length) {
  console.warn(
    '[VladDom] Не найдены .webp. Положите файлы в client/src/ или client/src/assets/'
  )
}
