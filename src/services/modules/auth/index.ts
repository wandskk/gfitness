import { api } from "@/services";
const basePath = "/auth";

export const AuthServices = {
  login: async (body: object) => {
    const result = await api.post(`${basePath}/login`, body);
    return result.data;
  },
};
