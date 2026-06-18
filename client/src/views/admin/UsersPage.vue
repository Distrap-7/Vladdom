<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-title">Пользователи</h1>
    </header>
    <section class="admin-error">
      Управление пользователями недоступно на статическом сайте.<br/>
      <span class="admin-error__hint">Для работы требуется сервер с SERVICE_ROLE_KEY Supabase</span>
    </section>
  </section>
</template>

<style>
@import '../../styles/admin-shared.css';
.admin-error { background: #ffebee; color: #c62828; padding: 20px 24px; border-radius: 12px; font-size: 14px; }
.admin-error__hint { font-size: 12px; opacity: 0.7; margin-top: 8px; display: block; }
</style>
