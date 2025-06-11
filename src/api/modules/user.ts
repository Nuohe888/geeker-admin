import { User } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 新增用户 - 对应后端 Add 方法
export const Add = (params: User.ReqAddUser) => {
  return http.post(PORT1 + `/auth/user`, params);
};

// 删除用户 - 对应后端 Del 方法
export const Del = (id: string | number) => {
  return http.delete(PORT1 + `/auth/user/${id}`);
};

// 编辑用户 - 对应后端 Put 方法
export const Put = (id: string | number, params: User.ReqEditUser) => {
  return http.put(PORT1 + `/auth/user/${id}`, params);
};

// 获取单个用户信息 - 对应后端 Get 方法
export const Get = (id: string | number) => {
  return http.get<User.ResUserInfo>(PORT1 + `/auth/user`, { id });
};

// 获取用户列表 - 对应后端 List 方法
export const List = (params: User.ReqUserParams) => {
  return http.get<User.ResUserList>(PORT1 + `/auth/user/list`, params);
};

// 获取用户状态字典 - 对应后端 GetStatus 方法
export const GetStatus = () => {
  return http.get<User.ResStatus>(PORT1 + `/auth/user/status`);
};
