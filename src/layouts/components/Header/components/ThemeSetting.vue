<template>
  <div class="theme-setting">
    <i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer"></i>
  </div>
</template>

<script setup lang="ts">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
</script>

<style scoped lang="scss">
.iconfont {
  font-size: 18px;
  color: var(--text-color);
}
</style>
