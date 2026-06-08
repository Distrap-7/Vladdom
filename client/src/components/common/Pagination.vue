<template>
  <nav class="pagination" aria-label="Пагинация">
    <button
      type="button"
      class="pagination__btn pagination__btn--arrow"
      :disabled="modelValue <= 1"
      @click="go(modelValue - 1)"
    >
      ←
    </button>
    <template v-for="item in items" :key="item.key">
      <span v-if="item.type === 'ellipsis'" class="pagination__ellipsis">…</span>
      <button
        v-else
        type="button"
        class="pagination__btn"
        :class="{ 'pagination__btn--active': item.page === modelValue }"
        @click="go(item.page)"
      >
        {{ item.page }}
      </button>
    </template>
    <button
      type="button"
      class="pagination__btn pagination__btn--arrow"
      :disabled="modelValue >= totalPages"
      @click="go(modelValue + 1)"
    >
      →
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  lastPageLabel: { type: Number, default: null },
})

const emit = defineEmits(['update:modelValue'])

const items = computed(() => {
  const total = props.totalPages
  const current = props.modelValue
  const last = props.lastPageLabel && props.lastPageLabel > total ? props.lastPageLabel : total
  const result = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      result.push({ type: 'page', page: i, key: `p-${i}` })
    }
    return result
  }

  const pages = new Set([1, 2, 3, 4, current, total])
  if (last > total) pages.add(last)

  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b)

  sorted.forEach((page, index) => {
    const prev = sorted[index - 1]
    if (prev && page - prev > 1) {
      result.push({ type: 'ellipsis', key: `e-${page}` })
    }
    result.push({ type: 'page', page, key: `p-${page}` })
  })

  return result
})

function go(page) {
  if (page < 1 || page > props.totalPages) return
  emit('update:modelValue', page)
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
}

.pagination__btn {
  min-width: 44px;
  height: 44px;
  padding: 0 12px;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background: var(--color-bg-muted);
  color: var(--color-text-primary);
  transition: background var(--transition-fast), color var(--transition-fast);
}

.pagination__btn--arrow {
  background: var(--color-primary);
  color: var(--color-text-white);
}

.pagination__btn--arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__btn--active {
  background: var(--color-primary);
  color: var(--color-text-white);
}

.pagination__ellipsis {
  color: var(--color-text-muted);
  padding: 0 4px;
}
</style>
