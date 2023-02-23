export  type UserData = {
    account_type: "user" | "admin",
    active: boolean,
    name: string,
    token: string,
    id: number
}

export type Users = {
    account_type: "users" | "admin",
    active: boolean,
    adress?: string,
    city: string,
    email: string,
    id: number,
    name: string,
    phone: string,
    price: number
}