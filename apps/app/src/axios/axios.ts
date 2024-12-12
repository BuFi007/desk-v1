import ax, { AxiosError } from "axios";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

axios.interceptors.request.use(async (request) => {
  const tokenDefault = axios.defaults.headers.Authorization;

  if (!Boolean(tokenDefault)) {
    const session = await supabase.auth.getSession();

    if (session.data.session) {
      const bearerToken = `Bearer ${session.data.session.userToken}`;
      request.headers.Authorization = bearerToken;
      axios.defaults.headers.Authorization = bearerToken;
    }
  }

  return request;
});

axios.interceptors.response.use(undefined, async (error: unknown) => {
  if (error instanceof AxiosError && error.response?.status === 403) {
    await supabase.auth.signOut();
    window.location.href = "/signin";
  }

  throw error;
});

export { axios };
