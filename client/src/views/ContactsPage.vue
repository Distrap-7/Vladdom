<template>
  <section class="contacts">
    <section class="container">
      <h1 class="page-title">Контакты</h1>
    </section>
    <section class="container contacts__map-wrap">
      <section class="contacts__map">
        <iframe
          title="Карта офиса"
          src="https://www.openstreetmap.org/export/embed.html?bbox=131.88%2C43.10%2C131.95%2C43.14&layer=mapnik&marker=43.115%2C131.911"
          loading="lazy"
        />
      </section>
    </section>

    <section class="container contacts__grid section">
      <article v-for="card in infoCards" :key="card.title" class="info-card">
        <span class="info-card__icon">
          <img :src="card.icon" :alt="card.title" />
        </span>
        <h3>{{ card.title }}</h3>
        <p v-html="card.text" />
      </article>
    </section>

  </section>
</template>

<script setup>
import markerIcon from '../assets/icons/marker.svg'
import clockIcon from '../assets/icons/clock.svg'
import creditCardIcon from '../assets/icons/credit_card.svg'
import phoneIcon from '../assets/icons/phone.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import telegramIcon from '../assets/icons/telegram.svg'

const infoCards = [
  {
    title: 'Адрес',
    icon: markerIcon,
    text: 'г. Владивосток, ул. Светланская, д. 17, офис 305',
  },
  {
    title: 'Режим работы',
    icon: clockIcon,
    text: 'Пн–Пт: 09:00 – 20:00<br>Сб–Вс: 10:00 – 18:00',
  },
  {
    title: 'Реквизиты',
    icon: creditCardIcon,
    text: 'ИП Иванов И.И.<br>ИНН 123456789012<br>ОГРНИП 318253600012345',
  },
  { title: 'Номер', icon: phoneIcon, text: '<a href="tel:+79644360300">+7 (964) 436-03-00</a>' },
  { title: 'Написать в WhatsApp', icon: whatsappIcon, text: '<a href="#">WhatsApp</a>' },
  { title: 'Написать в Telegram', icon: telegramIcon, text: '<a href="#">Telegram</a>' },
]
</script>

<style scoped>
.contacts__map-wrap {
  padding-top: 32px;
}

.contacts__map {
  border-radius: var(--radius-xl);
  overflow: hidden;
  height: 400px;
  border: 1px solid var(--color-border);
}

.contacts__map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.section {
  padding: var(--spacing-3xl) 0;
}

.contacts__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.info-card {
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.info-card__icon {
  display: block;
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  border-radius: 4px;
  margin-bottom: 16px;
  position: relative;
}

.info-card__icon img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
}

.info-card h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 10px;
}

.info-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.info-card :deep(a) {
  color: var(--color-text-primary);
}

@media (max-width: 1100px) {
  .contacts__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .contacts__grid {
    grid-template-columns: 1fr;
  }
}
</style>
