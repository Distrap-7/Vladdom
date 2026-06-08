<template>
  <section class="request-page">
    <section class="request-hero">
      <img
        class="request-hero__bg"
        :src="SKY_IMAGE"
        alt="Вид на город — форма заявки VladDom"
        loading="lazy"
        decoding="async"
      />
      <section class="request-hero__overlay" />
      <section class="container request-hero__inner">
        <h1>Остались вопросы? Напишите нам</h1>
        <ContactRequestForm :initial-topic="initialTopic" />
      </section>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SKY_IMAGE } from '../utils/images'
import ContactRequestForm from '../components/common/ContactRequestForm.vue'

const route = useRoute()

const initialTopic = computed(() => {
  const topic = route.query.topic
  return typeof topic === 'string' ? topic : 'consultation'
})
</script>

<style scoped>
.request-page {
  min-height: calc(100vh - 80px);
}

.request-hero {
  position: relative;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 48px 0;
}

.request-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.request-hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 80, 120, 0.35);
}

.request-hero__inner {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
}

.request-hero__inner h1 {
  color: white;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 32px;
}
</style>
