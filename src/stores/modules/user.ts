import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import { getUserInfo } from "@/api/modules/login";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
  id: "geeker-user",
  state: (): UserState => ({
    token: "",
    userInfo: { name: "Geeker" }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    // Get UserInfo
    async getUserInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = {
          ...this.userInfo,
          userId: data.userId,
          avatar: data.avatar,
          userName: data.userName,
          nickName: data.nickName,
          name: data.nickName || data.userName // 使用 nickName 作为 name，如果没有则使用 userName
        };
        return data;
      } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
      }
    }
  },
  persist: piniaPersistConfig("geeker-user")
});
