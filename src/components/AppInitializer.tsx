"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { API_URL } from "@/constants/api";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

export function AppInitializer() {
  const { setUserData, clearUserData } = useUserStore();
  const isInitialized = useRef(false);

  const fetchUserData = useCallback(async () => {
    try {
      const url = `${API_URL}/api/users`;
      const response = await axios.get(url);
      if (response.data?.length > 0) {
        const user = response.data[0];
        setUserData({
          id: user.userId,
          email: user.email,
        });
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
      clearUserData();
    }
  }, [setUserData, clearUserData]);

  useLayoutEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    fetchUserData();
  }, [fetchUserData]);

  return null;
}
