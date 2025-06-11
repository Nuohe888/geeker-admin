<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="700px" :destroy-on-close="true" draggable>
    <el-form ref="userCenterFormRef" :model="dialogProps.row" :rules="userCenterRules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="dialogProps.row.username" placeholder="请输入用户名" :disabled="isEdit" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="dialogProps.row.nickname" placeholder="请输入昵称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="dialogProps.row.password"
              type="password"
              placeholder="请输入密码"
              show-password
              autocomplete="new-password"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="dialogProps.row.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              show-password
              autocomplete="new-password"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="dialogProps.row.realName" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="dialogProps.row.idCard" placeholder="请输入身份证号" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="dialogProps.row.phone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dialogProps.row.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="头像" prop="avatar">
        <el-input v-model="dialogProps.row.avatar" placeholder="请输入头像URL（可选）" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="dialogProps.row.status" placeholder="请选择状态" style="width: 100%">
          <el-option label="启用" :value="1" />
          <el-option label="禁用" :value="0" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="loading">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { Add, Put } from "@/api/modules/userCenter";
import { UserCenter } from "@/api/interface";

interface DialogProps {
  title: string;
  row: Partial<UserCenter.UserCenterInfo & { confirmPassword?: string }>;
}

const emit = defineEmits<{
  success: [];
}>();

const dialogVisible = ref(false);
const loading = ref(false);
const userCenterFormRef = ref<FormInstance>();
const isEdit = ref(false);

const dialogProps = ref<DialogProps>({
  title: "",
  row: {}
});

// 对话框标题
const dialogTitle = computed(() => `${dialogProps.value.title}用户`);

// 确认密码校验
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (!isEdit.value) {
    // 新增模式：必须验证确认密码
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== dialogProps.value.row.password) {
      callback(new Error("两次输入的密码不一致"));
    } else {
      callback();
    }
  } else {
    // 编辑模式：只有在输入了密码的情况下才验证确认密码
    if (dialogProps.value.row.password && dialogProps.value.row.password.length > 0) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== dialogProps.value.row.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
};

// 表单验证规则
const userCenterRules = computed(() => ({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名只能包含字母、数字和下划线", trigger: "blur" }
  ],
  password: [
    { required: !isEdit.value, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" }
  ],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: "blur" }],
  nickname: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 2, max: 20, message: "昵称长度在 2 到 20 个字符", trigger: "blur" }
  ],
  phone: [{ pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }],
  email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }],
  idCard: [
    {
      pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      message: "请输入正确的身份证号",
      trigger: "blur"
    }
  ],
  status: [{ required: true, message: "请选择状态", trigger: "change" }]
}));

// 接受父组件参数
const acceptParams = (params: DialogProps) => {
  dialogProps.value = params;
  isEdit.value = params.title === "编辑";
  dialogVisible.value = true;
};

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
};

// 确认操作
const handleConfirm = async () => {
  if (!userCenterFormRef.value) return;

  try {
    const valid = await userCenterFormRef.value.validate();
    if (!valid) return;

    loading.value = true;

    if (isEdit.value) {
      // 编辑用户中心
      const params: UserCenter.ReqEditUserCenter = {
        username: dialogProps.value.row.username,
        nickname: dialogProps.value.row.nickname,
        realName: dialogProps.value.row.realName,
        phone: dialogProps.value.row.phone,
        email: dialogProps.value.row.email,
        idCard: dialogProps.value.row.idCard,
        avatar: dialogProps.value.row.avatar,
        status: dialogProps.value.row.status
      };

      if (dialogProps.value.row.password) {
        params.password = dialogProps.value.row.password;
      }

      await Put(dialogProps.value.row.id!, params);
      ElMessage.success("用户编辑成功！");
    } else {
      // 新增用户中心
      const params: UserCenter.ReqAddUserCenter = {
        username: dialogProps.value.row.username!,
        password: dialogProps.value.row.password!,
        nickname: dialogProps.value.row.nickname!,
        realName: dialogProps.value.row.realName,
        phone: dialogProps.value.row.phone,
        email: dialogProps.value.row.email,
        idCard: dialogProps.value.row.idCard,
        avatar: dialogProps.value.row.avatar,
        status: dialogProps.value.row.status!
      };

      await Add(params);
      ElMessage.success("用户新增成功！");
    }

    dialogVisible.value = false;
    emit("success");
  } catch (error: any) {
    ElMessage.error(error.message || "操作失败，请重试");
  } finally {
    loading.value = false;
  }
};

defineExpose({ acceptParams });
</script>
