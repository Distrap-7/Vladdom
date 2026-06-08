<template>
  <aside class="filters">
    <section v-if="showMode" class="filters__group">
      <span class="filters__label">Режим</span>
      <section class="filters__toggles">
        <button
          type="button"
          class="filters__toggle"
          :class="{ 'filters__toggle--active': filters.dealType === 'sale' }"
          @click="set('dealType', 'sale')"
        >
          Купить
        </button>
        <button
          type="button"
          class="filters__toggle"
          :class="{ 'filters__toggle--active': filters.dealType === 'rent' }"
          @click="set('dealType', 'rent')"
        >
          Снять
        </button>
      </section>
    </section>

    <section class="filters__group">
      <span class="filters__label">Район</span>
      <section class="filters__search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M20 20L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input
          type="text"
          :value="filters.district"
          placeholder="Ленинский"
          @input="set('district', $event.target.value)"
        />
      </section>
    </section>

    <section v-if="extended" class="filters__group">
      <span class="filters__label">Микрорайон</span>
      <select :value="filters.microdistrict" @change="set('microdistrict', $event.target.value)">
        <option value="">Выберите</option>
        <option v-for="m in microdistricts" :key="m" :value="m">{{ m }}</option>
      </select>
    </section>

    <section v-if="showType" class="filters__group">
      <span class="filters__label">Тип жилья</span>
      <select :value="filters.type" @change="set('type', $event.target.value)">
        <option value="">Все типы</option>
        <option value="apartment">Квартира</option>
        <option value="house">Дом</option>
        <option value="townhouse">Таунхаус</option>
      </select>
    </section>

    <section v-if="extended" class="filters__group">
      <span class="filters__label">Тип недвижимости</span>
      <section class="filters__toggles filters__toggles--wrap">
        <button
          v-for="t in propertyTypes"
          :key="t.value"
          type="button"
          class="filters__toggle"
          :class="{ 'filters__toggle--active': filters.type === t.value }"
          @click="set('type', filters.type === t.value ? '' : t.value)"
        >
          {{ t.label }}
        </button>
      </section>
    </section>

    <section class="filters__group">
      <span class="filters__label">Кол-во комнат</span>
      <section class="filters__toggles">
        <button
          v-for="r in roomOptions"
          :key="r.value"
          type="button"
          class="filters__toggle"
          :class="{ 'filters__toggle--active': filters.rooms === r.value }"
          @click="set('rooms', filters.rooms === r.value ? '' : r.value)"
        >
          {{ r.label }}
        </button>
      </section>
    </section>

    <section class="filters__group">
      <span class="filters__label">Цена</span>
      <section class="filters__range">
        <input
          type="text"
          placeholder="от"
          :value="filters.minPrice"
          @input="set('minPrice', $event.target.value)"
        />
        <input
          type="text"
          placeholder="до"
          :value="filters.maxPrice"
          @input="set('maxPrice', $event.target.value)"
        />
      </section>
    </section>

    <section v-if="extended" class="filters__group">
      <span class="filters__label">Площадь</span>
      <section class="filters__range">
        <input
          type="text"
          placeholder="От кв.м²"
          :value="filters.minArea"
          @input="set('minArea', $event.target.value)"
        />
        <input
          type="text"
          placeholder="До кв.м²"
          :value="filters.maxArea"
          @input="set('maxArea', $event.target.value)"
        />
      </section>
    </section>

    <section v-if="extended" class="filters__actions">
      <button type="button" class="btn-primary btn-primary--wide" @click="$emit('apply')">
        Применить
      </button>
      <button type="button" class="btn-outline btn-primary--wide" @click="reset">
        Сбросить
      </button>
    </section>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { usePropertiesStore } from '../../stores/properties'

defineProps({
  extended: { type: Boolean, default: false },
  showMode: { type: Boolean, default: true },
  showType: { type: Boolean, default: true },
})

defineEmits(['apply'])

const propertiesStore = usePropertiesStore()
const filters = computed(() => propertiesStore.filters)

const roomOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' },
]

const propertyTypes = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'townhouse', label: 'Таунхаус' },
]

const microdistricts = ['Центр', 'Эгершельд', 'Снеговая Падь', 'Второй речки', 'Золотой Рог']

function set(key, value) {
  propertiesStore.updateFilters({ [key]: value })
}

function reset() {
  propertiesStore.resetFilters()
}
</script>

<style scoped>
.filters {
  width: 280px;
  flex-shrink: 0;
}

.filters__group {
  margin-bottom: 28px;
}

.filters__label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.filters__toggles {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filters__toggle {
  padding: 10px 16px;
  font-size: var(--font-size-sm);
  border-radius: var(--radius-pill);
  background: var(--color-bg-muted);
  color: var(--color-text-primary);
  transition: background var(--transition-fast), color var(--transition-fast);
}

.filters__toggle--active {
  background: var(--color-primary);
  color: var(--color-text-white);
}

.filters__search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--color-bg-muted);
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
}

.filters__search input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  outline: none;
}

.filters select,
.filters__range input {
  width: 100%;
  padding: 12px 14px;
  font-size: var(--font-size-sm);
  background: var(--color-bg-muted);
  border: none;
  border-radius: var(--radius-lg);
  outline: none;
}

.filters__range {
  display: flex;
  gap: 8px;
}

.filters__range input {
  flex: 1;
}

.filters__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

@media (max-width: 1024px) {
  .filters {
    width: 100%;
  }
}
</style>
