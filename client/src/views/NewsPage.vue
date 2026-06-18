<template>
  <section class="news page">
    <section class="container">
      <h1 class="page-title">Новости</h1>
      <section class="news__grid">
        <article v-for="item in newsList" :key="item.id" class="news-card">
          <section class="news-card__image">
            <img :src="item.image" :alt="item.title" />
            <span class="news-card__tag">{{ item.tag }}</span>
          </section>
          <section class="news-card__body">
            <span class="news-card__time">{{ item.readTime }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.excerpt }}</p>
            <section class="news-card__author">
              <img :src="item.authorAvatar" :alt="`Автор: ${item.author}`" loading="lazy" width="36" height="36" />
              <section>
                <span>{{ item.author }}</span>
                <time>{{ item.date }}</time>
              </section>
            </section>
          </section>
        </article>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Pagination from '../components/common/Pagination.vue'
import { img, imgAny, BUILDING_IMAGE, INTERIOR_IMAGE } from '../utils/images'

const currentPage = ref(1)

const agentAvatars = [
  img('мужик'),
  img('nodirbek'),
  img('vladimir'),
  img('мужик'),
  img('nodirbek'),
  img('vladimir'),
  img('мужик'),
  img('nodirbek'),
  img('vladimir'),
]

const newsList = [
  {
    id: 1,
    tag: 'Аналитика',
    readTime: '5 min read',
    title: 'Владивосток стал лидером по росту цен на жильё в ДФО',
    excerpt: 'Средняя стоимость квадратного метра в городе выросла на 12% за последний год.',
    date: 'April 30, 2024',
    author: 'Алексей Соколов',
    image: imgAny('news1', 'news-1') || BUILDING_IMAGE,
    authorAvatar: agentAvatars[0],
  },
  {
    id: 2,
    tag: 'Новости',
    readTime: '4 min read',
    title: 'Открытие нового жилого комплекса «Морской берег»',
    excerpt: 'В Ленинском районе запущен в эксплуатацию новый ЖК на 500 квартир.',
    date: 'April 25, 2024',
    author: 'Нодирбек Каримов',
    image: imgAny('news2', 'news-2') || INTERIOR_IMAGE,
    authorAvatar: agentAvatars[1],
  },
  {
    id: 3,
    tag: 'Гид',
    readTime: '6 min read',
    title: 'Ипотечные ставки снижены до рекордного минимума',
    excerpt: 'Сбербанк и ВТБ предлагают ипотеку под 8,5% годовых для жителей Приморья.',
    date: 'April 20, 2024',
    author: 'Владимир Петров',
    image: imgAny('news3', 'news-3') || img('object1'),
    authorAvatar: agentAvatars[2],
  },
  {
    id: 4,
    tag: 'Новости',
    readTime: '3 min read',
    title: 'Реконструкция центра Владивостока завершена',
    excerpt: 'Обновлённая Светланская улица стала пешеходной зоной с новыми скверами.',
    date: 'April 15, 2024',
    author: 'Алексей Соколов',
    image: imgAny('news4', 'news-4') || img('object2'),
    authorAvatar: agentAvatars[3],
  },
  {
    id: 5,
    tag: 'Аналитика',
    readTime: '5 min read',
    title: 'Власти Приморья субсидируют ипотеку для молодых семей',
    excerpt: 'Молодые семьи могут получить до 500 тыс. рублей на первоначальный взнос.',
    date: 'April 10, 2024',
    author: 'Нодирбек Каримов',
    image: imgAny('news5', 'news-5') || img('object3'),
    authorAvatar: agentAvatars[4],
  },
  {
    id: 6,
    tag: 'Гид',
    readTime: '4 min read',
    title: 'Новый транспортный узел в районе Второй речки',
    excerpt: 'Планируется строительство транспортно-пересадочного узла и новых дорог.',
    date: 'April 5, 2024',
    author: 'Владимир Петров',
    image: imgAny('news6', 'news-6') || img('object4'),
    authorAvatar: agentAvatars[5],
  },
  {
    id: 7,
    tag: 'Новости',
    readTime: '3 min read',
    title: 'Спрос на апартаменты у моря вырос на 18%',
    excerpt: 'Покупатели всё чаще выбирают жильё с видом на залив и готовой отделкой.',
    date: 'March 28, 2024',
    author: 'Алексей Соколов',
    image: imgAny('news7', 'news-7') || img('object5'),
    authorAvatar: agentAvatars[6],
  },
  {
    id: 8,
    tag: 'Аналитика',
    readTime: '5 min read',
    title: 'Обзор загородного рынка Приморья',
    excerpt: 'Коттеджи и таунхаусы: где растут цены быстрее всего.',
    date: 'March 20, 2024',
    author: 'Нодирбек Каримов',
    image: imgAny('news8', 'news-8') || img('object6'),
    authorAvatar: agentAvatars[7],
  },
  {
    id: 9,
    tag: 'Гид',
    readTime: '7 min read',
    title: 'Как проверить юридическую чистоту квартиры',
    excerpt: 'Чек-лист документов и рисков перед подписанием договора.',
    date: 'March 12, 2024',
    author: 'Владимир Петров',
    image: imgAny('news9', 'news-9') || img('object7'),
    authorAvatar: agentAvatars[8],
  },
]
</script>

<style scoped>
.page {
  padding: 40px 0 var(--spacing-5xl);
}

.news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.news-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.news-card__image {
  position: relative;
  height: 220px;
}

.news-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: var(--font-weight-medium);
}

.news-card__body {
  padding: 20px;
}

.news-card__time {
  font-size: 11px;
  color: var(--color-text-muted);
  display: block;
  margin-bottom: 8px;
}

.news-card__body h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 1.35;
  margin-bottom: 8px;
}

.news-card__body p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}

.news-card__author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.news-card__author img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.news-card__author span {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.news-card__author time {
  font-size: 11px;
  color: var(--color-text-muted);
}

@media (max-width: 1100px) {
  .news__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .news__grid {
    grid-template-columns: 1fr;
  }
}
</style>
