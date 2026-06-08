<template>
  <footer class="footer-wrap">
  <section class="footer">
    <section class="footer__content container">
      <section class="footer__brand">
        <span class="footer__logo">VladDom</span>
        <p class="footer__tagline">Недвижимость Владивостока №1<br />в Владивостоке</p>
        <a href="tel:+79644360300" class="footer__phone">+7 (964)-436-03-00</a>
        <section class="footer__social">
          <a href="#" class="footer__social-btn" aria-label="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
              />
            </svg>
          </a>
          <a href="#" class="footer__social-btn" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
              />
            </svg>
          </a>
        </section>
      </section>

      <nav class="footer__nav">
        <section class="footer__col">
          <h4>Главная</h4>
          <router-link to="/catalog">Каталог</router-link>
          <router-link to="/catalog?type=new">Новостройки</router-link>
          <router-link to="/catalog?type=secondary">Вторичное жилье</router-link>
          <router-link to="/catalog?type=house">Загородное</router-link>
        </section>
        <section class="footer__col">
          <h4>Услуги</h4>
          <router-link :to="{ path: '/request', query: { topic: 'purchase' } }">Покупка</router-link>
          <router-link :to="{ path: '/request', query: { topic: 'sale' } }">Продажа</router-link>
          <router-link :to="{ path: '/request', query: { topic: 'mortgage' } }">
            Ипотечный брокер
          </router-link>
          <router-link :to="{ path: '/request', query: { topic: 'legal' } }">
            Юридическая проверка
          </router-link>
        </section>
        <section class="footer__col">
          <h4>Поддержка</h4>
          <router-link to="/contacts">Помощь</router-link>
          <router-link to="/contacts">FAQ</router-link>
          <router-link to="/contacts">Контакты</router-link>
          <router-link to="/contacts">Карта сайта</router-link>
        </section>
      </nav>
    </section>

  </section>
  <section class="footer-watermark" aria-hidden="true">
    <span class="footer-watermark__text">VLADDOM</span>
  </section>
  </footer>
</template>

<style scoped>
.footer-wrap {
  margin-top: auto;
  background: #0a0a0a;
}

.footer {
  position: relative;
  color: var(--color-text-white);
  padding: 56px 0 40px;
}

.footer__content {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  position: relative;
  z-index: 2;
}

.footer__brand {
  max-width: 300px;
}

.footer__logo {
  font-size: 22px;
  font-weight: var(--font-weight-regular);
  display: block;
  margin-bottom: 14px;
  letter-spacing: -0.02em;
}

.footer__tagline {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-light);
  opacity: 0.55;
  line-height: 1.45;
  margin-bottom: 28px;
}

.footer__phone {
  display: block;
  font-size: 22px;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.01em;
  margin-bottom: 22px;
}

.footer__social {
  display: flex;
  gap: 10px;
}

.footer__social-btn {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: background var(--transition-fast);
}

.footer__social-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.footer__nav {
  display: flex;
  gap: 80px;
}

.footer__col h4 {
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 18px;
  color: rgba(255, 255, 255, 0.85);
}

.footer__col a {
  display: block;
  font-size: 13px;
  font-weight: var(--font-weight-light);
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 10px;
  transition: color var(--transition-fast);
}

.footer__col a:hover {
  color: rgba(255, 255, 255, 0.85);
}

/* Водяной знак — отдельный блок как на макете: огромный outline, обрезан снизу */
.footer-watermark {
  position: relative;
  height: clamp(80px, 12vw, 140px);
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: -1px;
}

.footer-watermark__text {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: clamp(11rem, 24vw, 22rem);
  font-weight: 500;
  line-height: 0.78;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffffff;
  transform: translateY(18%);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

@media (max-width: 900px) {
  .footer__content {
    flex-direction: column;
    gap: 36px;
  }

  .footer__nav {
    flex-wrap: wrap;
    gap: 32px 48px;
  }

  .footer-watermark__text {
    font-size: clamp(6rem, 28vw, 10rem);
    transform: translateY(22%);
  }
}
</style>
