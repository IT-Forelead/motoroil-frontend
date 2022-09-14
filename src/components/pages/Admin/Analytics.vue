<script setup>
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { DoughnutChart, BarChart, PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useAnalyticsStore } from '../../../stores/analytics'
import { useSkeletonStore } from '../../../stores/skeleton'
import { useDiscountStore } from '../../../stores/discount'
import MoneyBagIcon from '../../../assets/icons/MoneyBagIcon.vue'
import DiscountCircleIcon from '../../../assets/icons/DiscountCircleIcon.vue'
import UsersIcon from '../../../assets/icons/UsersIcon.vue'
import OrderIcon from '../../../assets/icons/OrderIcon.vue'
import { useProductStore } from '../../../stores/product'
import { useOrderStore } from '../../../stores/order'
import MoneyBillTrendUpIcon from '../../../assets/icons/MoneyBillTrendUpIcon.vue'

const analyticsStore = useAnalyticsStore()
const orderStore = useOrderStore()

Chart.register(...registerables)

const pages = ref([])
const userView = ref([])
const ghostView = ref([])
const productUserView = ref([])
const productGhostView = ref([])
const totalSumInLast30Days = ref(0.0)

function newProductChecker(createdAt) {
  let today = new Date()
  return new Date(today.setDate(today.getDate() - 30)) <= new Date(createdAt)
}

totalSumInLast30Days.value = orderStore.ordersForAdmins?.filter((e) =>
  newProductChecker(e?.orders?.createdAt)
)

watch(
  () => orderStore.ordersForAdmins,
  () => {
    totalSumInLast30Days.value = orderStore.ordersForAdmins?.filter((e) =>
      newProductChecker(e?.orders?.createdAt)
    ).map(o => o.orderItem?.totalPrice).reduce((q, a) => q + a, 0)
  },
  { deep: true }
)

watch(
  () => analyticsStore.events,
  () => {
    let events = analyticsStore.events?.filter((e) =>
      newProductChecker(e?.createdAt)
    )
    pages.value = Array.from(
      new Set(events?.map((e) => e?.page).filter((p) => p))
    )
    userView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[0] && e?.userId && e?.name === 'pageVisited'
      ).length
    )
    userView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[1] && e?.userId && e?.name === 'pageVisited'
      ).length
    )
    userView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[2] && e?.userId && e?.name === 'pageVisited'
      ).length
    )
    ghostView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[0] && !e?.userId && e?.name === 'pageVisited'
      ).length
    )
    ghostView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[1] && !e?.userId && e?.name === 'pageVisited'
      ).length
    )
    ghostView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[2] && !e?.userId && e?.name === 'pageVisited'
      ).length
    )
    productUserView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[1] && e?.userId && e?.name === 'productViewed'
      ).length
    )
    productGhostView.value.push(
      events?.filter(
        (e) =>
          e?.page === pages.value[1] &&
          !e?.userId &&
          e?.name === 'productViewed'
      ).length
    )
  },
  { deep: true }
)

const viewData = computed(() => {
  return {
    labels: [...pages.value],
    datasets: [
      {
        label: 'User',
        data: [...userView.value],
        backgroundColor: ['#77CEFF'],
      },
      {
        label: 'Ghost',
        data: [...ghostView.value],
        backgroundColor: ['#f00'],
      },
    ],
  }
})
const donut = computed(() => {
  return {
    labels: ['User', 'Ghost'],
    datasets: [
      {
        label: 'User',
        data: [...productUserView.value, ...productGhostView.value],
        backgroundColor: ['#77CEFF', '#123E6B'],
      },
    ],
  }
})
const donut2 = computed(() => {
  return {
    labels: ['Products', 'Orders'],
    datasets: [
      {
        label: 'User',
        data: [
          useProductStore()
            .products?.map((p) => p?.product?.quantity)
            .reduce((q, a) => q + a, 0),
          useProductStore()
            .products?.map((p) => p?.product?.orders)
            .reduce((q, a) => q + a, 0),
        ],
        backgroundColor: ['#FACA15', '#31C48D'],
      },
    ],
  }
})

const discountStatusSum = reactive({
  active: 0,
  waiting: 0,
  notActive: 0,
})

onMounted(() => {
  useAnalyticsStore().getAnalytics()
  useProductStore().getAllProducts()
  useAnalyticsStore().getUsersByRole()
  useDiscountStore()
    .getDiscounts()
    .then(() => {
      useDiscountStore().discounts?.map((d) => {
        let now = new Date()
        if (
          new Date(d?.startedAt).getTime() <= now.getTime() &&
          now.getTime() <= new Date(d?.expiredAt).getTime()
        ) {
          discountStatusSum.active++
        } else if (now.getTime() <= new Date(d?.startedAt).getTime()) {
          discountStatusSum.waiting++
        } else if (now.getTime() >= new Date(d?.expiredAt).getTime()) {
          discountStatusSum.notActive++
        }
      })
    })
  useOrderStore().getOrdersForAdmins()
})
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container">
      <h3 class="pb-2 mb-3 text-2xl font-bold border-b">Analytics</h3>
      <div
        v-if="!useSkeletonStore().isContentLoaded"
        role="status"
        class="w-full max-w-sm p-4 mx-auto animate-pulse md:p-6 dark:border-gray-700"
      >
        <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
        <div class="w-1/2 h-2 mb-10 bg-gray-200 rounded-full"></div>
        <div class="flex items-baseline mt-4 space-x-6">
          <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
          <div class="w-full h-56 bg-gray-200 rounded-t-lg"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
          <div class="w-full h-64 bg-gray-200 rounded-t-lg"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-80"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
          <div class="w-full bg-gray-200 rounded-t-lg h-80"></div>
        </div>
      </div>
      <div v-else>
        <div class="grid grid-cols-4 gap-10">
          <div class="p-3 border rounded-xl">
            <div class="flex justify-between">
              <div>
                <p class="text-3xl font-bold">€{{ totalSumInLast30Days }}</p>
                <p>Last 30 days income</p>
              </div>
              <MoneyBagIcon class="w-10 h-10" />
            </div>
            <div class="flex items-center justify-between w-full mt-7">
              <MoneyBillTrendUpIcon class="w-10 h-10"/>
              <div class="space-y-3">
                <div class="w-10 h-3 ml-auto bg-gray-100 rounded-full"></div>
                <div class="w-24 h-3 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div class="p-3 border rounded-xl">
            <div class="flex justify-between">
              <div>
                <p class="text-3xl font-bold">
                  {{ useAnalyticsStore().users?.length }}
                </p>
                <p>All users</p>
              </div>
              <UsersIcon class="w-9 h-9" />
            </div>
            <div class="flex items-baseline w-1/2 mt-4 space-x-3">
              <div class="w-full h-5 bg-gray-200 rounded-md"></div>
              <div class="w-full h-16 bg-blue-500 rounded-md shadow-xl"></div>
              <div class="w-full bg-gray-200 rounded-md h-14"></div>
              <div class="w-full h-10 bg-gray-200 rounded-md"></div>
            </div>
          </div>
          <div class="p-3 border rounded-xl">
            <div class="flex justify-between">
              <div>
                <p class="text-3xl font-bold">
                  {{ useOrderStore().ordersForAdmins?.length }}
                </p>
                <p>All orders</p>
              </div>
              <OrderIcon class="w-9 h-9" />
            </div>
            <div class="flex items-center justify-between w-full mt-7">
              <img src="/chart.png" alt="chart" />
              <div class="space-y-3">
                <div class="w-10 h-3 ml-auto bg-gray-100 rounded-full"></div>
                <div class="w-24 h-3 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div class="h-full p-3 space-y-2 border rounded-xl">
            <div class="flex justify-between">
              <div>
                <p class="text-3xl font-bold">
                  {{ useDiscountStore().discounts?.length }}
                </p>
                <p>All discounts</p>
              </div>
              <DiscountCircleIcon class="w-9 h-9" />
            </div>
            <div
              class="flex flex-col items-center mt-auto space-y-1 overflow-hidden text-white"
            >
              <div
                title="Active"
                class="flex items-end justify-center w-full transition-all duration-300 bg-green-400 rounded-full cursor-pointer hover:scale-110"
              >
                {{ discountStatusSum.active }} (active)
              </div>
              <div
                title="Waiting"
                class="flex items-end justify-center w-full transition-all duration-300 bg-yellow-300 rounded-full cursor-pointer hover:scale-110"
              >
                {{ discountStatusSum.waiting }} (waiting)
              </div>
              <div
                title="Inactive"
                class="flex items-end justify-center w-full transition-all duration-300 bg-red-500 rounded-full cursor-pointer hover:scale-110"
              >
                {{ discountStatusSum.notActive }} (inactive)
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-10 mt-10">
          <div class="p-3 border rounded-xl">
            <p class="text-lg font-bold text-center text-gray-600 capitalize">Pages visited report</p>
            <BarChart :chartData="viewData" />
          </div>
          <div class="grid items-center grid-cols-2 p-3 border divide-x rounded-xl">
            <div>
              <p class="text-lg font-bold text-center text-gray-600 capitalize">Product Viewed reports</p>
              <DoughnutChart :chartData="donut" />
            </div>
            <div>
              <p class="text-lg font-bold text-center text-gray-600 capitalize">Product order report</p>
              <PieChart :chartData="donut2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
