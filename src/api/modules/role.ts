import { Role } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 角色管理模块
 */
// 新增角色 - 对应后端 Add 方法
export const Add = (params: Role.ReqAddRole) => {
  return http.post(PORT1 + `/auth/role`, params);
};

// 删除角色 - 对应后端 Del 方法
export const Del = (id: string | number) => {
  return http.delete(PORT1 + `/auth/role/${id}`);
};

// 编辑角色 - 对应后端 Put 方法
export const Put = (id: string | number, params: Role.ReqEditRole) => {
  return http.put(PORT1 + `/auth/role/${id}`, params);
};

// 获取单个角色信息 - 对应后端 Get 方法
export const Get = (id: string | number) => {
  return http.get<Role.ResRoleInfo>(PORT1 + `/auth/role`, { id });
};

// 获取角色列表 - 对应后端 List 方法
export const List = (params: Role.ReqRoleParams) => {
  return http.get<Role.ResRoleList>(PORT1 + `/auth/role/list`, params);
};

// 获取所有角色列表 - 对应后端 ListAll 方法
export const ListAll = () => {
  return http.get<Role.ResRoleAll[]>(PORT1 + `/auth/role/list/all`, {}, { loading: false, cancel: false });
};

// 获取角色状态字典 - 对应后端 GetStatus 方法
export const GetStatus = () => {
  return http.get<Role.ResStatus>(PORT1 + `/auth/role/status`);
};
