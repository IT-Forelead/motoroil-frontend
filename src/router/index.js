import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../components/pages/Home/Home.vue'),
    meta: { layout: 'dashboard' },
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
    beforeEnter: notSelectedBlog(),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../components/pages/Products/Products.vue'),
    meta: { layout: 'dashboard' },
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../components/pages/Products/Product.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: notSelectedProduct(),
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../components/pages/User/Wishlist.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('user'),
  },
  {
    path: '/cart',
    name: 'My Cart',
    component: () => import('../components/pages/User/Cart.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('user'),
  },
  {
    path: '/address',
    name: 'My Address',
    component: () => import('../components/pages/User/UserAddress.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('user'),
  },
  {
    path: '/orders',
    name: 'My orders',
    component: () => import('../components/pages/User/Orders.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('user'),
  },
  {
    path: '/admin/orders',
    name: 'Orders',
    component: () => import('../components/pages/Admin/Orders.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/store',
    name: 'Store',
    component: () => import('../components/pages/Admin/Store.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/discount',
    name: 'Discount',
    component: () => import('../components/pages/Admin/Discounts.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/coupon',
    name: 'Coupon',
    component: () => import('../components/pages/Admin/Coupons.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/product-groups',
    name: 'Product group',
    component: () => import('../components/pages/Admin/ProductGroups.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/spec-type',
    name: 'Spec Type',
    component: () => import('../components/pages/Admin/SpecType.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/product-models',
    name: 'Product Models',
    component: () => import('../components/pages/Admin/ProductModels.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/accounting',
    name: 'Accounting',
    component: () => import('../components/pages/Admin/Accounting.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    component: () => import('../components/pages/Admin/Analytics.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuard('admin'),
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
    path: '/notfound',
    name: 'Not-Found',
    component: () => import('../components/NotFound.vue'),
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
//   const publicPages = [
//     '/blogs',
//     '/products',
//     '/blog',
//     '/product',
//     '/faq',
//     '/about-us',
//   ]
//   const authNotRequired = !publicPages.includes(to.path)
//   const notLoggedIn = sessionStorage.getItem('Authorization')
//   if (authNotRequired && notLoggedIn) {
//     next()
//   } else {
//     next('/')
//   }
// })

function navigationGuard(role) {
  return () => {
    if (!(sessionStorage.getItem('role') === role)) {
      router.push('/notfound')
    }
    return sessionStorage.getItem('role') === role
  }
}

function notSelectedBlog() {
  return () => {
    if (sessionStorage.getItem('sb_id') === null) router.push('/notfound')
    return sessionStorage.getItem('sb_id') !== null
  }
}

function notSelectedProduct() {
  return () => {
    if (sessionStorage.getItem('sp_id') === null) router.push('/notfound')
    return sessionStorage.getItem('sp_id') !== null
  }
}

export default router
