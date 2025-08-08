export interface TUser {
    id: string
    name: string
    mail: string
    password: string
}

export interface TProduct {
    id: string
    title: string
    description: string
    cost: number
}

export interface TLoginUser {
    name: string
    password: string
}

export interface TRegisterUser {
    name: string
    mail: string
    password: string
}