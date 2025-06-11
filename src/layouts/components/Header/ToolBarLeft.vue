<template>
  <div class="tool-bar-lf">
    <CollapseIcon id="collapseIcon" />
    <Breadcrumb v-show="globalStore.breadcrumb" id="breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;

  // 移动端优化
  @media screen and (width <= 768px) {
    // 在移动端可能需要隐藏面包屑以节省空间
    #breadcrumb {
      display: none;
    }
  }

  @media screen and (width <= 480px) {
    // 超小屏幕保持折叠按钮，隐藏面包屑
    justify-content: flex-start;
  }
}
</style>
