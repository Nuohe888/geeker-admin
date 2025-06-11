<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="角色列表"
      :columns="columns"
      :request-api="getTableList"
      :data-callback="dataCallback"
      :tool-button="['refresh', 'setting']"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增角色</el-button>
      </template>

      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="Edit" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteRole(scope.row)">删除</el-button>
      </template>
    </ProTable>

    <!-- 角色对话框 -->
    <RoleDialog ref="roleDialogRef" @success="handleDialogSuccess" />
  </div>
</template>

<script setup lang="tsx" name="systemRole">
import { ref, reactive } from "vue";
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue";
import { List, Del } from "@/api/modules/role";
import { Role } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import RoleDialog from "./components/RoleDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 角色对话框引用
const roleDialogRef = ref<InstanceType<typeof RoleDialog>>();

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
  return {
    list: data.items || data.list || [],
    total: data.total || 0
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
const getTableList = (params: any) => {
  // 只保留 page 和 limit 参数，因为后端只支持这两个参数
  const newParams: Role.ReqRoleParams = {
    page: params.pageNum || params.page || 1,
    limit: params.pageSize || params.limit || 20
  };
  return List(newParams);
};

// 表格配置项
const columns = reactive<ColumnProps<Role.RoleInfo>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "name",
    label: "角色名称",
    width: 150
  },
  {
    prop: "code",
    label: "角色编码",
    width: 150
  },
  {
    prop: "desc",
    label: "角色描述",
    render: scope => {
      return scope.row.desc || "-";
    }
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    render: scope => {
      return scope.row.status === 1 ? "启用" : "禁用";
    }
  },
  {
    prop: "createdAt",
    label: "创建时间",
    width: 180,
    render: scope => {
      const dateString = scope.row.createdAt || scope.row.updatedAt;
      if (!dateString) return "-";
      return new Date(dateString).toLocaleString("zh-CN");
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 200 }
]);

// 删除角色信息
const deleteRole = async (params: Role.RoleInfo) => {
  await useHandleData(Del, params.id!, `删除【${params.name}】角色`);
  proTable.value?.getTableList();
};

// 打开 dialog(新增、编辑)
const openDrawer = (title: string, row: Partial<Role.RoleInfo> = {}) => {
  roleDialogRef.value?.openDialog(title === "新增" ? "add" : "edit", row);
};

// 对话框成功回调
const handleDialogSuccess = () => {
  proTable.value?.getTableList();
};
</script>
