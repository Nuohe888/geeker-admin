<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" :destroy-on-close="true" draggable>
    <el-form ref="userFormRef" :model="dialogProps.row" :rules="userRules" label-width="100px">
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

      <el-row :gutter="20" v-if="!isEdit">
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
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="dialogProps.row.roleId" placeholder="请选择角色" style="width: 100%">
              <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="dialogProps.row.status" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="头像" prop="avatar">
        <el-input v-model="dialogProps.row.avatar" placeholder="请输入头像URL（可选）" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { Add, Put } from "@/api/modules/user";
import { ListAll as getRoleList } from "@/api/modules/role";
import { User, Role } from "@/api/interface";

interface DialogProps {
  title: string;
  row: Partial<User.UserInfo & { confirmPassword?: string }>;
}

const emit = defineEmits<{
  success: [];
}>();

const dialogVisible = ref(false);
const loading = ref(false);
const userFormRef = ref<FormInstance>();
const isEdit = ref(false);

const dialogProps = ref<DialogProps>({
  title: "",
  row: {}
});

// 角色列表
const roleList = ref<Role.ResRoleAll[]>([]);

// 获取角色列表
const fetchRoleList = async () => {
  try {
    // 添加 loading: false 和 cancel: false 来避免请求被取消
    const { data } = await getRoleList();
    roleList.value = data || [];
  } catch (error: any) {
    // 忽略取消的请求错误
    if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
      console.error("获取角色列表失败:", error);
      ElMessage.error("获取角色列表失败，请刷新页面重试");
    }
  }
};

// 在需要时获取角色列表（延迟加载）
const ensureRoleList = async () => {
  if (roleList.value.length === 0) {
    await fetchRoleList();
  }
};

// 对话框标题
const dialogTitle = computed(() => `${dialogProps.value.title}用户`);

// 确认密码校验
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (!isEdit.value) {
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
};

// 表单验证规则
const userRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" }
  ],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }]
});

// 接受父组件参数
const acceptParams = (params: DialogProps) => {
  dialogProps.value = params;
  isEdit.value = params.title === "编辑";
  dialogVisible.value = true;

  // 确保角色列表已加载
  ensureRoleList();
};

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
};

// 确认操作
const handleConfirm = async () => {
  if (!userFormRef.value) return;

  try {
    const valid = await userFormRef.value.validate();
    if (!valid) return;

    loading.value = true;

    if (isEdit.value) {
      // 编辑用户
      const params: User.ReqEditUser = {
        username: dialogProps.value.row.username,
        nickname: dialogProps.value.row.nickname,
        avatar: dialogProps.value.row.avatar,
        roleId: dialogProps.value.row.roleId,
        status: dialogProps.value.row.status
      };

      if (dialogProps.value.row.password) {
        params.password = dialogProps.value.row.password;
      }

      await Put(dialogProps.value.row.id!, params);
      ElMessage.success("用户编辑成功！");
    } else {
      // 新增用户
      const params: User.ReqAddUser = {
        username: dialogProps.value.row.username!,
        password: dialogProps.value.row.password!,
        nickname: dialogProps.value.row.nickname!,
        avatar: dialogProps.value.row.avatar,
        roleId: dialogProps.value.row.roleId!,
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

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
:deep(.el-form-item__label) {
  font-weight: 500;
}
</style>
