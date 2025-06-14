<template>
  <Maximize v-show="maximize" />
  <Tabs v-show="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, provide, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDebounceFn } from "@vueuse/core";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";

const globalStore = useGlobalStore();
const { maximize, isCollapse, layout, tabs } = storeToRefs(globalStore);

const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);

// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);

// 监听当前页面是否最大化，动态添加 class
watch(
  () => maximize.value,
  () => {
    const app = document.getElementById("app") as HTMLElement;
    if (maximize.value) app.classList.add("main-maximize");
    else app.classList.remove("main-maximize");
  },
  { immediate: true }
);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute("class", layout.value);
  },
  { immediate: true }
);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;

  // 移动端（768px以下）强制折叠侧边栏
  if (screenWidth.value <= 768) {
    if (!isCollapse.value) globalStore.setGlobalState("isCollapse", true);
    document.body.classList.add("mobile-device");
    document.body.classList.remove("tablet-device");
  }
  // 平板端（768px-1200px）保持折叠
  else if (screenWidth.value <= 1200) {
    if (!isCollapse.value) globalStore.setGlobalState("isCollapse", true);
    document.body.classList.remove("mobile-device");
    document.body.classList.add("tablet-device");
  }
  // 桌面端（1200px以上）展开侧边栏
  else {
    if (isCollapse.value) globalStore.setGlobalState("isCollapse", false);
    document.body.classList.remove("mobile-device", "tablet-device");
  }
}, 100);

window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@use "./index";
</style>
