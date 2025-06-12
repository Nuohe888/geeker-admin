<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <!-- <AssemblySize id="assemblySize" /> -->
      <ThemeSetting id="themeSetting" />
      <Fullscreen id="fullscreen" />
    </div>
    <span class="username">{{ username }}</span>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/modules/user";
// import AssemblySize from "./components/AssemblySize.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";

const userStore = useUserStore();
const username = computed(() => userStore.userInfo.nickName || userStore.userInfo.userName || userStore.userInfo.name);
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
  .username {
    margin: 0 20px;
    font-size: 13px;
    color: var(--text-color);
  }

  // 移动端优化
  @media screen and (width <= 768px) {
    .header-icon {
      & > * {
        margin-left: 15px;
      }
    }
    .username {
      margin: 0 12px;
      font-size: 14px;
    }
  }

  @media screen and (width <= 480px) {
    padding-right: 8px;
    .header-icon {
      margin-right: 10px;
      & > * {
        margin-left: 10px;
      }
    }
    .username {
      display: none; // 超小屏幕隐藏用户名
    }
  }
}
</style>
