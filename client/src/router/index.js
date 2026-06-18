import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { usePropertiesStore } from '../stores/properties'
import { applyRouteSeo, buildPropertySeo } from '../utils/seo'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/CatalogPage.vue'),
  },
  {
    path: '/property/:id',
    name: 'Property',
    component: () => import('../views/PropertyPage.vue'),
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesPage.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/NewsPage.vue'),
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/ContactsPage.vue'),
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import('../views/RequestPage.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthPage.vue'),
  },
  {
    path: '/login',
    redirect: { name: 'Auth' },
  },
  {
    path: '/register',
    redirect: { name: 'Auth' },
  },
  {
    path: '/forgot-password',
    redirect: { name: 'Auth' },
  },
  {
    path: '/cart',
    redirect: { name: 'Catalog' },
  },
  {
    path: '/account',
    redirect: { name: 'Auth' },
  },
  {
    path: '/cabinet',
    redirect: { name: 'Auth' },
  },
  {
    path: '/my-applications',
    name: 'MyApplications',
    component: () => import('../views/MyApplicationsPage.vue'),
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/LoginPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../views/admin/DashboardPage.vue'),
      },
      {
        path: 'properties',
        name: 'AdminProperties',
        component: () => import('../views/admin/PropertiesPage.vue'),
      },
      {
        path: 'news',
        name: 'AdminNews',
        component: () => import('../views/admin/NewsPage.vue'),
      },
      {
        path: 'applications',
        name: 'AdminApplications',
        component: () => import('../views/admin/ApplicationsPage.vue'),
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../views/admin/UsersPage.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAdmin) {
    if (!authStore.user) {
      return next({ name: 'AdminLogin' })
    }
    return next()
  }

  if ((to.name === 'Favorites' || to.name === 'MyApplications') && !authStore.user) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.name === 'Property' && to.params.id) {
    const propertiesStore = usePropertiesStore()
    const property = propertiesStore.getPropertyById(to.params.id)
    applyRouteSeo(to, buildPropertySeo(property))
    return
  }

  applyRouteSeo(to)
})

export default router
