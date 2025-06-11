// 请求响应参数（不包含data）
export interface Result {
  code: string;
  message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  page: number;
  limit: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  page: number;
  limit: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    accessToken: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
  export interface ResUserInfo {
    userId: number;
    avatar: string;
    userName: string;
    nickName: string;
  }
  export interface ReqEditPassword {
    oldPassword: string;
    newPassword: string;
  }
}

// 用户管理模块
export namespace User {
  // 用户列表请求参数 - 匹配后端 List 方法的 query 参数
  export interface ReqUserParams {
    page: number;
    limit: number;
  }

  // 用户信息 - 匹配后端 User 模型
  export interface UserInfo {
    id?: number;
    username?: string;
    password?: string;
    nickname?: string;
    avatar?: string;
    roleId?: number;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
  }

  // 用户列表响应 - 匹配后端 vo.List 结构
  export interface ResUserList {
    items: UserInfo[];
    total: number;
  }

  // 单个用户信息响应
  export interface ResUserInfo extends UserInfo {}

  // 新增用户请求参数 - 匹配后端 Add 方法
  export interface ReqAddUser {
    username: string;
    password: string;
    nickname: string;
    avatar?: string;
    roleId: number;
    status: number;
  }

  // 编辑用户请求参数 - 匹配后端 Put 方法
  export interface ReqEditUser {
    username?: string;
    password?: string;
    nickname?: string;
    avatar?: string;
    roleId?: number;
    status?: number;
  }

  // 状态字典响应 - 匹配后端 GetStatus 方法
  export interface ResStatus {
    [key: string]: string;
  }

  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }

  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }

  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

// 角色管理模块
export namespace Role {
  // 角色列表请求参数 - 匹配后端 List 方法的 query 参数
  export interface ReqRoleParams {
    page: number;
    limit: number;
  }

  // 角色信息 - 匹配后端 Role 模型
  export interface RoleInfo {
    id?: number;
    name?: string;
    code?: string;
    desc?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
  }

  // 角色列表响应 - 匹配后端 vo.List 结构
  export interface ResRoleList {
    items: RoleInfo[];
    total: number;
  }

  // 单个角色信息响应
  export interface ResRoleInfo extends RoleInfo {}

  // 新增角色请求参数 - 匹配后端 Add 方法
  export interface ReqAddRole {
    name: string;
    code: string;
    desc?: string;
    status: number;
  }

  // 编辑角色请求参数 - 匹配后端 Put 方法
  export interface ReqEditRole {
    name?: string;
    code?: string;
    desc?: string;
    status?: number;
  }

  // 状态字典响应 - 匹配后端 GetStatus 方法
  export interface ResStatus {
    [key: string]: string;
  }

  // 所有角色列表响应 - 匹配后端 ListAll 方法
  export interface ResRoleAll {
    id: number;
    name: string;
  }
}

// 用户中心模块
export namespace UserCenter {
  // 用户中心信息 - 匹配后端 UserCenter 模型
  export interface UserCenterInfo {
    id?: number;
    username?: string;
    password?: string;
    salt?: string;
    nickname?: string;
    avatar?: string;
    phone?: string;
    email?: string;
    realName?: string;
    idCard?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
  }

  // 用户中心列表响应
  export interface ResUserCenterList extends UserCenterInfo {}

  // 新增用户中心请求参数 - 匹配后端 Add 方法
  export interface ReqAddUserCenter {
    username: string;
    password: string;
    nickname: string;
    avatar?: string;
    phone?: string;
    email?: string;
    realName?: string;
    idCard?: string;
    status: number;
  }

  // 编辑用户中心请求参数 - 匹配后端 Put 方法
  export interface ReqEditUserCenter {
    username?: string;
    password?: string;
    nickname?: string;
    avatar?: string;
    phone?: string;
    email?: string;
    realName?: string;
    idCard?: string;
    status?: number;
  }

  // 用户中心列表请求参数
  export interface ReqUserCenterParams extends ReqPage {
    username?: string;
    nickname?: string;
    phone?: string;
    email?: string;
    status?: number;
  }

  // 状态字典响应 - 匹配后端 GetStatus 方法
  export interface ResStatus {
    [key: string]: string;
  }
}
