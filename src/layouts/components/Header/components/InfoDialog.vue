<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="用户ID">
        {{ userStore.userInfo.userId || "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="用户名">
        {{ userStore.userInfo.userName || "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="昵称">
        {{ userStore.userInfo.nickName || "-" }}
      </el-descriptions-item>
      <el-descriptions-item label="头像">
        <el-avatar v-if="userStore.userInfo.avatar" :src="userStore.userInfo.avatar" :size="50" />
        <span v-else>-</span>
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/modules/user";

const userStore = useUserStore();
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
