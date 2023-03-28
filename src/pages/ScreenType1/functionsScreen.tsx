import axios from "axios"
import { ProductScreen, Screen } from "../../types/types"
import { ProductType2 } from "../User/MyProducts"


export async function getProductsScreen(screen_id: string |undefined, config: object, setMyProductsScreen: React.Dispatch<React.SetStateAction<ProductScreen[]>>) {
    try {
        const sucess = await axios.get(`http://localhost:4000/productsscreen/${screen_id}`, config)
        setMyProductsScreen(sucess.data)
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(config: object , setMyProducts: React.Dispatch<React.SetStateAction<ProductType2[]>>) {
    try {
        const productsList = await axios.get("http://localhost:4000/products", config)
        setMyProducts(productsList.data)
    } catch (error) {
        console.log(error)
    }
}

export async function getScreen(screen_id: string |undefined, config: object, setScreen: React.Dispatch<React.SetStateAction<Screen>>){
    try {
        const sucess = await axios.get(`http://localhost:4000/screen/${screen_id}`, config)
        setScreen(sucess?.data)
    } catch (error) {
        console.log(error)
    }
}

export const defaultScreen = {
    background_url: "",
    font_family: "",
    font_size: 1,
    id: 0,
    screen_name: "",
    show_banner: true,
    show_counter: true,
    show_productstable: true,
    space_lines: 0,
    table_lines: 5,
    user_id: 0,
    color_lines: "  ",
    width_table: 0,
    price_position: "",
    product_position: "",
    background_color_title: "",
    font_family_title: "",
    color: "",
    color_title: "",
    banner_time: 1000
}