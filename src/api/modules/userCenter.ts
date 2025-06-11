import { PORT1 } from "@/api/config/servicePort";
import { UserCenter } from "@/api/interface/index";
import { ResPage } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 用户中心管理模块
 */

// 获取用户中心列表 - 对应后端 List 方法 (GET请求)
export const List = (params: UserCenter.ReqUserCenterParams) => {
  return http.get<ResPage<UserCenter.ResUserCenterList>>(PORT1 + `/auth/user_center/list`, params);
};

// 获取单个用户中心信息 - 对应后端 Get 方法 (通过查询参数传递ID)
export const Get = (params: { id: number }) => {
  return http.get<UserCenter.UserCenterInfo>(PORT1 + `/auth/user_center`, params);
};

// 新增用户中心 - 对应后端 Add 方法
export const Add = (params: UserCenter.ReqAddUserCenter) => {
  return http.post(PORT1 + `/auth/user_center`, params);
};

// 编辑用户中心 - 对应后端 Put 方法
export const Put = (id: number, params: UserCenter.ReqEditUserCenter) => {
  return http.put(PORT1 + `/auth/user_center/${id}`, params);
};

// 删除用户中心 - 对应后端 Del 方法
export const Del = (id: number) => {
  return http.delete(PORT1 + `/auth/user_center/${id}`);
};

// 获取用户中心状态字典 - 对应后端 GetStatus 方法
export const GetStatus = () => {
  return http.get<UserCenter.ResStatus>(PORT1 + `/auth/user_center/status`);
};
