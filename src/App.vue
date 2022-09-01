<script setup>
import Navbar from './components/layout/Navbar/Navbar.vue';
import Footer from './components/layout/Footer/Footer.vue';
import Home from './components/pages/Home/Home.vue';
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

const {t, locale} = useI18n()

const defaultLayout = "login";

const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);


</script>

<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<style scoped>
</style>
