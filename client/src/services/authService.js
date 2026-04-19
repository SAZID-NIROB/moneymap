import api from "./api";

const authService = {
  async login(payload) {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
  async register(payload) {
    const { data } = await api.post("/auth/register", payload);
    return data;
  }
};

export default authService;
