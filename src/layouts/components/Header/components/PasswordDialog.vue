<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="passwordForm.oldPassword"
          type="password"
          placeholder="请输入旧密码"
          show-password
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          type="password"
          placeholder="请输入新密码"
          show-password
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="passwordForm.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          show-password
          autocomplete="new-password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { editPasswordApi } from "@/api/modules/login";
import { Login } from "@/api/interface";

const dialogVisible = ref(false);
const loading = ref(false);
const passwordFormRef = ref<FormInstance>();

// 表单数据
const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});

// 确认密码校验
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入新密码"));
  } else if (value !== passwordForm.newPassword) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

// 表单验证规则
const passwordRules = reactive({
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: validateConfirmPassword, trigger: "blur" }
  ]
});

// 打开对话框
const openDialog = () => {
  dialogVisible.value = true;
  resetForm();
};

// 重置表单
const resetForm = () => {
  passwordForm.oldPassword = "";
  passwordForm.newPassword = "";
  passwordForm.confirmPassword = "";
  passwordFormRef.value?.clearValidate();
};

// 取消
const handleCancel = () => {
  dialogVisible.value = false;
  resetForm();
};

// 确认修改密码
const handleConfirm = async () => {
  if (!passwordFormRef.value) return;

  try {
    const valid = await passwordFormRef.value.validate();
    if (!valid) return;

    loading.value = true;

    const params: Login.ReqEditPassword = {
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    };

    await editPasswordApi(params);

    ElMessage.success("密码修改成功！");
    dialogVisible.value = false;
    resetForm();
  } catch (error: any) {
    ElMessage.error(error.message || "密码修改失败，请重试");
  } finally {
    loading.value = false;
  }
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
:deep(.el-form-item__label) {
  font-weight: 500;
}
:deep(.el-input__inner) {
  &:focus {
    border-color: #165dff;
  }
}
</style>
