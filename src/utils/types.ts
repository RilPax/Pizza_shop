export interface TUser {
  id: string;
  name: string;
  mail: string;
  password: string;
}

export interface TProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  cathegory: string;
}

export interface TLoginUser {
  mail: string;
  password: string;
}

export interface TRegisterUser {
  name: string;
  mail: string;
  password: string;
}
