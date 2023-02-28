import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ProductsTable from "./ProductsTable"
import Settings from "./Settings"
import SideBar from "./SideBar"
import iconSetting from "../../img/iconSetting.svg"
import axios from "axios"
import MyContext from "../../context/context"
import { useParams } from "react-router-dom"
import { ProductScreen, Screen } from "../../types/types"
import { ProductType } from "../User/UserScreen"
import { ProductType2 } from "../User/MyProducts"



export default function ScreenType1() {
    const [password, setPassword] = useState(0)
    const [screen, setScreen] = useState<Screen>({
        background_url: "",
        font_family: "",
        font_size: 1,
        id: 0,
        screen_name: "",
        show_banner: true,
        show_counter: true,
        show_productstable: true,
        space_lines: 0,
        table_lines: 1,
        user_id: 0,
        color_lines: "",
        width_table: 0
    })
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [settings, setSettings] = useState({
        settingVisible: false,
        update: false
    })
    const screen_id = useParams().id
    const [myProducts, setMyProducts] = useState<ProductType2[]>([])
    const [myProductsScreen, setMyProductsScreen] = useState<ProductScreen[]>([])
    const ProductsId: Number[] = myProductsScreen.map((product) => (product?.product_id))
    const Products: ProductType[] = myProductsScreen.map((product) => product?.products)
    


    function passwordConfigs() {
        setPassword(password + 1)

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Senha ${password + 1}. repetindo.senha ${password + 1}`;
            utterance.lang = 'pt-BR';
            utterance.rate = 1.2;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        }
    }
 
    useEffect(() => {
        const screens = async () => {
            try {
                const sucess = await axios.get(`http://localhost:4000/screen/${screen_id}`, config)
                setScreen(sucess?.data)
            } catch (error) {
                console.log(error)
            }
        }
        screens()
        const getProducts = async () => {
            try {
                const productsList = await axios.get("http://localhost:4000/products", config)
                setMyProducts(productsList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
        const getProductsScreen = async() => {
            try{
                const sucess = await axios.get(`http://localhost:4000/productsscreen/${screen_id}`, config)
                setMyProductsScreen(sucess.data)
            }catch(error){
                console.log(error)
            }
        }
        getProductsScreen()
    }, [settings.update])

    return (
        <Container onKeyDown={(event) => event.key === "Enter" ? passwordConfigs() : ""} tabIndex={0}>
            <Settings settings={settings} setSettings={setSettings} screen={screen} setScreen={setScreen} myProducts={myProducts} ProductsId={ProductsId} />
            <SideBar password={password} screen={screen} />
            <ProductsTable screen={screen} Products={Products} />
            <img className="settings" src={iconSetting} onClick={() => setSettings({ ...settings, settingVisible: true })} />
        </Container>
    )
}

const Container = styled.div`
    max-width: 100%;
    height: 100vh;
    background-color: #0026ff;
    display: flex;
    color: white;
    overflow: hidden;
    position: relative;
    
 
    .settings{
        width: 60px;
        position: fixed;
        top: 16px;
        left: 16px;
        opacity: 0;
        cursor: pointer;
        
        &:hover{
           opacity: 1;
        }
    }

    .gradient{
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #000000 -20%, rgba(0, 0, 0, 0) 200%);
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 4rem;
    }

    header{
        display: flex;
        justify-content: space-between;
        margin-top: 1.6rem;
        font-family: 'Lilita One', cursive;
        font-size: 5vw;
        z-index: 520;
    }
`