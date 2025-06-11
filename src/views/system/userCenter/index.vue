<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="用户中心管理"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="Edit" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <UserCenterDialog ref="userCenterDialogRef" @success="handleDialogSuccess" />
  </div>
</template>

<script setup lang="tsx" name="systemUserCenter">
import { ref, reactive } from "vue";
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue";

import { List, Del } from "@/api/modules/userCenter";
import { UserCenter } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import UserCenterDialog from "./components/UserCenterDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 用户中心对话框引用
const userCenterDialogRef = ref<InstanceType<typeof UserCenterDialog>>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && page && limit 这些字段，可以在这里进行处理成这些字段
// 后端返回的数据结构：{ items: [], total: number }，需要转换为前端期望的格式
const dataCallback = (data: any) => {
  return {
    list: data.items || [], // 后端返回的是 items 字段
    total: data.total || 0, // 总数
    page: data.page || 1, // 当前页码
    limit: data.limit || 10 // 每页大小
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
const getTableList = (params: any) => {
  // 转换分页参数：pageNum/pageSize -> page/limit
  const newParams: UserCenter.ReqUserCenterParams = {
    page: params.pageNum || params.page || 1,
    limit: params.pageSize || params.limit || 20,
    // 搜索参数
    username: params.username,
    nickname: params.nickname,
    phone: params.phone,
    email: params.email,
    status: params.status
  };
  return List(newParams);
};

// 表格配置项
const columns = reactive<ColumnProps<UserCenter.UserCenterInfo>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "username",
    label: "用户名",
    width: 120,
    search: { el: "input", tooltip: "请输入用户名" }
  },
  {
    prop: "nickname",
    label: "昵称",
    width: 120,
    search: { el: "input", tooltip: "请输入昵称" }
  },
  {
    prop: "realName",
    label: "真实姓名",
    width: 120
  },
  {
    prop: "phone",
    label: "手机号",
    width: 130,
    search: { el: "input", tooltip: "请输入手机号" }
  },
  {
    prop: "email",
    label: "邮箱",
    width: 180,
    search: { el: "input", tooltip: "请输入邮箱" }
  },
  {
    prop: "idCard",
    label: "身份证号",
    width: 180
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    search: { el: "select", tooltip: "请选择状态" },
    enum: [
      { label: "启用", value: 1 },
      { label: "禁用", value: 0 }
    ],
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

// 删除用户中心信息
const deleteAccount = async (params: UserCenter.UserCenterInfo) => {
  await useHandleData(Del, params.id!, `删除【${params.nickname || params.username}】用户`);
  proTable.value?.getTableList();
};

// 打开 dialog(新增、编辑)
const openDrawer = (title: string, row: Partial<UserCenter.UserCenterInfo> = {}) => {
  const params = {
    title,
    row: { ...row }
  };
  userCenterDialogRef.value?.acceptParams(params);
};

// 对话框成功回调
const handleDialogSuccess = () => {
  proTable.value?.getTableList();
};
</script>
