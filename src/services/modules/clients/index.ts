import { api } from "@/services";
const basePath = "/clients";

export const ClientsServices = {
  getAll: async (token: string) => {
    const result = await api.get(`${basePath}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  getClientById: async (clientId: number, token: string) => {
    const result = await api.get(`${basePath}/${clientId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  createClient: async (body: object, token: string) => {
    const result = await api.post(`${basePath}`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  updateClientById: async (clientId: number, body: object, token: string) => {
    const result = await api.put(`${basePath}/${clientId}`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  deleteClientById: async (clientId: number, token: string) => {
    const result = await api.delete(`${basePath}/${clientId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
};
