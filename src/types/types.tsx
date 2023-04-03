import { ProductType2 } from "../pages/userMonitor/settings/myProducts"
import { ProductType } from "../pages/userScreen"

export type UserData = {
    account_type: "user" | "admin",
    active: boolean,
    name: string,
    token: string,
    id: number
}

export type UserDataGet = {
    account_type: "user" | "admin" | "",
    active: boolean | null,
    name: string | null,
    token: string | null,
    id: number | null
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

export type Screen = {
    background_url: string,
    font_family: string,
    font_size: number,
    id: number,
    screen_name: string,
    show_banner: boolean,
    show_counter: boolean,
    show_productstable: boolean,
    space_lines: number,
    table_lines: number,
    user_id: number,
    color_lines: string,
    width_table: number,
    price_position: string,
    product_position: string,
    background_color_title: string,
    font_family_title: string,
    color: string,
    color_title: string,
    banner_time: number,
    bold: boolean,
    italic: boolean
}

export type ProductScreen = {
    id: number,
    product_id: number,
    products: ProductType2,
    screen_id: number,
    user_id: number

}

export type Files = {
    file_name: string,
    id: number,
    original_name: string,
    screen_od: number,
    size: number,
    url: string,
    user_id: number
}

export type NewUser = {
    name: string,
    email: string,
    password: string
    phone: string,
    city: string,
    adress: string,
    price: number
}

export type CreateNewUserProps = {
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
    showCreateUser: boolean
    setShowCreateUser: React.Dispatch<React.SetStateAction<boolean>>
}

export type Login = {
    email: string,
    password: string
}
