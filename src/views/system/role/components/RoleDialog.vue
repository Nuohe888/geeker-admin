<template>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" :destroy-on-close="true" draggable>
    <el-form ref="roleFormRef" :model="roleForm" :rules="roleRules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="roleForm.code" placeholder="请输入角色编码" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="角色描述" prop="desc">
        <el-input v-model="roleForm.desc" type="textarea" :rows="3" placeholder="请输入角色描述（可选）" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="roleForm.status" placeholder="请选择状态" style="width: 100%">
          <el-option label="启用" :value="1" />
          <el-option label="禁用" :value="0" />
        </el-select>
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
import { Add, Put } from "@/api/modules/role";
import { Role } from "@/api/interface";

interface RoleFormData {
  id?: number;
  name: string;
  code: string;
  desc: string;
  status: number | undefined;
}

const emit = defineEmits<{
  success: [];
}>();

const dialogVisible = ref(false);
const loading = ref(false);
const roleFormRef = ref<FormInstance>();
const isEdit = ref(false);

// 表单数据
const roleForm = reactive<RoleFormData>({
  name: "",
  code: "",
  desc: "",
  status: undefined
});

// 对话框标题
const dialogTitle = computed(() => (isEdit.value ? "编辑角色" : "新增角色"));

// 表单验证规则
const roleRules = reactive({
  name: [
    { required: true, message: "请输入角色名称", trigger: "blur" },
    { min: 2, max: 50, message: "角色名称长度在 2 到 50 个字符", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入角色编码", trigger: "blur" },
    { min: 2, max: 50, message: "角色编码长度在 2 到 50 个字符", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9_]+$/, message: "角色编码只能包含字母、数字和下划线", trigger: "blur" }
  ],
  status: [{ required: true, message: "请选择状态", trigger: "change" }]
});

// 重置表单
const resetForm = () => {
  // 先清除验证
  roleFormRef.value?.clearValidate();

  // 然后重置表单数据
  Object.assign(roleForm, {
    name: "",
    code: "",
    desc: "",
    status: undefined
  });
};

// 打开对话框
const openDialog = (type: "add" | "edit", roleData?: Role.RoleInfo) => {
  isEdit.value = type === "edit";
  dialogVisible.value = true;

  if (type === "edit" && roleData) {
    Object.assign(roleForm, {
      id: roleData.id,
      name: roleData.name,
      code: roleData.code || "",
      desc: roleData.desc || "",
      status: roleData.status
    });
  } else {
    resetForm();
  }
};

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
};

// 确认操作
const handleConfirm = async () => {
  if (!roleFormRef.value) return;

  try {
    const valid = await roleFormRef.value.validate();
    if (!valid) return;

    loading.value = true;

    if (isEdit.value) {
      // 编辑角色
      const params: Role.ReqEditRole = {
        name: roleForm.name,
        code: roleForm.code,
        desc: roleForm.desc,
        status: roleForm.status
      };

      await Put(roleForm.id!, params);
      ElMessage.success("角色编辑成功！");
    } else {
      // 新增角色
      const params: Role.ReqAddRole = {
        name: roleForm.name,
        code: roleForm.code,
        desc: roleForm.desc,
        status: roleForm.status!
      };

      await Add(params);
      ElMessage.success("角色新增成功！");
    }

    dialogVisible.value = false;
    resetForm();
    emit("success");
  } catch (error: any) {
    ElMessage.error(error.message || "操作失败，请重试");
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
</style>
