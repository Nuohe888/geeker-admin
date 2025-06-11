<template>
  <el-form ref="loginFormRef" :model="loginForm" size="large">
    <el-form-item>
      <el-input v-model="loginForm.username" placeholder="用户名">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="密码"
        show-password
        autocomplete="new-password"
        @keyup.enter="login"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login"> 登录 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { Login } from "@/api/interface";
import { ElNotification, ElMessage } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: ""
});

// 现在已经禁用了全局错误处理，所以不需要防抖机制

// login
const login = async () => {
  // 简单检查是否有输入内容
  if (!loginForm.username.trim() || !loginForm.password.trim()) {
    ElMessage.warning("请输入用户名和密码");
    return;
  }

  loading.value = true;

  try {
    // 1.执行登录接口
    const { data } = await loginApi({ ...loginForm, password: loginForm.password });
    userStore.setToken(data.accessToken);

    // 2.获取用户信息
    await userStore.getUserInfo();

    // 3.添加动态路由
    await initDynamicRouter();

    // 4.清空 tabs、keepAlive 数据
    tabsStore.setTabs([]);
    keepAliveStore.setKeepAliveName([]);

    // 5.跳转到首页
    router.push(HOME_URL);
    ElNotification({
      title: getTimeState(),
      message: "欢迎登录 Geeker-Admin",
      type: "success",
      duration: 3000
    });
  } catch (error: any) {
    // 登录失败
    console.log("登录失败:", error);

    // 显示错误消息 - 已禁用全局错误处理，只在这里显示
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      (error?.message && typeof error.message === "string" ? error.message : null) ||
      "登录失败，请检查用户名和密码";

    ElMessage.error(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
@use "../index";
</style>
