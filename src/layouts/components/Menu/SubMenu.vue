<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path" class="menu-sub-item">
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="subItem.path"
      class="menu-item"
      :class="{ 'menu-item-loading': loadingItem === subItem.path }"
      @click="handleClickMenu(subItem)"
    >
      <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
        <div v-if="loadingItem === subItem.path" class="menu-loading-indicator"></div>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const loadingItem = ref<string>("");

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");

  // 添加加载效果
  loadingItem.value = subItem.path;

  // 延迟一点时间显示加载效果，然后跳转
  setTimeout(() => {
    router.push(subItem.path);
    // 跳转后清除加载状态
    setTimeout(() => {
      loadingItem.value = "";
    }, 300);
  }, 150);
};
</script>

<style lang="scss">
.el-sub-menu {
  .el-sub-menu__title {
    &:hover {
      .el-icon {
        transition: transform var(--el-menu-transition-duration, 0.15s) ease-in-out;
        transform: scale(1.1);
      }
    }
    .el-icon {
      transition: transform var(--el-menu-transition-duration, 0.15s) ease-in-out;
    }
  }
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        content: "";
        background-color: #ffffff;
        opacity: 0.8;
      }
    }
  }
  .el-sub-menu__title {
    &:hover {
      &::after {
        position: absolute;
        top: 50%;
        right: 8px;
        width: 0;
        height: 0;
        content: "";
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid var(--el-color-primary);
        transform: translateY(-50%);
        animation: arrow-pulse 0.6s ease-in-out infinite alternate;
      }
    }
  }
}
.el-menu-item {
  &:hover {
    .el-icon {
      transition: transform var(--el-menu-transition-duration, 0.15s) ease-in-out;
      transform: scale(1.1);
    }
  }
  .el-icon {
    transition: transform var(--el-menu-transition-duration, 0.15s) ease-in-out;
  }
  &.is-active {
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
      animation: slide-in-left 0.3s ease-out;
    }
    .el-icon {
      color: var(--el-color-primary);
      transform: scale(1.05);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}

/* 动画关键帧 */
@keyframes arrow-pulse {
  from {
    opacity: 0.6;
    transform: translateY(-50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

@keyframes slide-in-left {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 4px;
    opacity: 1;
  }
}

/* 菜单加载效果 */
.menu-item-loading {
  position: relative;
  .menu-loading-indicator {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 12px;
    height: 12px;
    border: 2px solid var(--el-color-primary);
    border-top: 2px solid transparent;
    border-radius: 50%;
    transform: translateY(-50%);
    animation: menu-loading-spin 0.8s linear infinite;
  }
}

@keyframes menu-loading-spin {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}

/* 菜单项增强样式 */
.menu-item,
.menu-sub-item {
  .el-icon {
    margin-right: 8px;
  }

  /* 只有真正hover且非活跃状态时才改变图标颜色 */
  &:hover:not(.is-active) {
    .el-icon {
      color: var(--el-color-primary);
    }
  }
}
</style>
