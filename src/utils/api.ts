import type { TLoginUser, TProduct, TRegisterUser, TUser } from "./types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = async (userData: TRegisterUser): Promise<TUser> => {
  const { data: existing } = await axios.get<TUser[]>(`${BASE_URL}/users`, {
    params: { mail: userData.mail },
  });
  if (existing.length > 0) {
    throw new Error("Пользователь с такой почтой уже существует");
  }

  const { data } = await axios.post<TUser>(`${BASE_URL}/users`, userData);
  localStorage.setItem("token", data.id.toString());
  return data;
};

export const loginUser = async (userData: TLoginUser): Promise<TUser> => {
  const { data } = await axios.get<TUser[]>(`${BASE_URL}/users`, {
    params: { mail: userData.mail, password: userData.password },
  });
  if (data.length === 0) {
    throw new Error("Неверная почта или пароль");
  }
  localStorage.setItem("token", data[0].id.toString());
  return data[0];
};

export const authoriseUser = async (): Promise<TUser | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const { data } = await axios.get<TUser>(`${BASE_URL}/users/${token}`);
    return data;
  } catch (error) {
    // Токен протух или пользователь удалён — разлогиниваем
    localStorage.removeItem("token");
    throw error;
  }
};

export const removeUser = async (): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.delete(`${BASE_URL}/users/${token}`);
  localStorage.removeItem("token");
};

export const fetchProducts = async (): Promise<TProduct[]> => {
  const { data } = await axios.get<TProduct[]>(`${BASE_URL}/products`);
  return data;
};

// Достаём понятное сообщение из ошибки axios / обычной ошибки
export const getErrorMessage = (error: unknown, fallback = "Что-то пошло не так") => {
  if (axios.isAxiosError(error)) {
    return error.response ? fallback : "Сервер недоступен. Запущен ли json-server?";
  }
  if (error instanceof Error) return error.message;
  return fallback;
};
