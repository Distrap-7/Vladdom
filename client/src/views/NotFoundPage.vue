<template>
  <section class="not-found page">
    <section class="container not-found__inner">
      <p class="not-found__code">404</p>
      <h1 class="not-found__title">Страница не найдена</h1>
      <p class="not-found__text">
        Такой страницы нет или она была удалена. Перейдите на главную или откройте каталог объектов.
      </p>
      <section class="not-found__actions">
        <router-link to="/" class="btn-primary">На главную</router-link>
        <router-link to="/catalog" class="btn-outline">В каталог</router-link>
      </section>
    </section>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.not-found__inner {
  text-align: center;
  max-width: 520px;
  margin: 0 auto;
  padding: 48px 0;
}

.not-found__code {
  font-size: clamp(64px, 12vw, 120px);
  font-weight: var(--font-weight-bold);
  color: var(--color-bg-muted);
  line-height: 1;
  margin-bottom: 16px;
}

.not-found__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 16px;
}

.not-found__text {
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
</style>
