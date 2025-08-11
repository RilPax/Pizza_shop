import type { TLoginUser, TProduct, TRegisterUser, TUser } from "./types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = async (userData: TRegisterUser): Promise<TUser> => {
  try {
    const { data } = await axios.post<TUser>(`${BASE_URL}/users`, userData);
    localStorage.setItem("token", data.id.toString());
    return data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};

export const loginUser = async (userData: TLoginUser): Promise<TUser> => {
  try {
    const { data } = await axios.get<TUser[]>(
      `${BASE_URL}/users?mail=${userData.mail}&password=${userData.password}`
    );
    localStorage.setItem("token", data[0].id.toString());
    return data[0];
  } catch (error) {
    console.error("Ошибка при логине:", error);
    throw error;
  }
};

export const authoriseUser = async (): Promise<TUser | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const { data } = await axios.get<TUser>(`${BASE_URL}/users/${token}`);
    return data;
  } catch (error) {
    console.error("произошла ошибка:", error);
    throw error;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/users/${token}`);
    localStorage.removeItem("token");
  } catch (error) {
    console.error("произошла ошибка:", error);
    throw error;
  }
};

export const fetchProducts = async (): Promise<TProduct[]> => {
  try {
    const { data } = await axios.get<TProduct[]>(`${BASE_URL}/products`);
    return data;
  } catch (error) {
    console.error("произошла ошибка:", error);
    throw error;
  }
};
