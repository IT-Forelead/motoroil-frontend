import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../components/pages/Home/Home.vue'),
    meta: { layout: 'dashboard' },
    // beforeEnter: navigationGuard('client'),
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../components/pages/Blogs/Blogs.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../components/pages/Blogs/Blog.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: () => import('../components/pages/AboutUs/AboutUs.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('../components/pages/Faq.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/:pathMach(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/', '/blogs', '/products']
//   const authNotRequired = !publicPages.includes(to.path)
//   const notLoggedIn = localStorage.getItem('token')
//   if ((authNotRequired && notLoggedIn)) {
//     next()
//   } else {
//     next('/')
//   }
// })

// function navigationGuard(role) {
//   return () => {
//     return localStorage.getItem('role') === role
//   }
// }

export default router
