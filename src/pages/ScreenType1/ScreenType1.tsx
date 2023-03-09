import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ProductsTable from "./ProductsTable"
import Settings from "./Settings"
import SideBar from "./SideBar"
import iconSetting from "../../img/iconSetting.svg"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { ProductScreen, Screen } from "../../types/types"
import { ProductType } from "../User/UserScreen"
import { ProductType2 } from "../User/MyProducts"



export default function ScreenType1() {
    const [password, setPassword] = useState(0)
    const [passworDigit, setPasswordDigit] = useState("")
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
    const Products = myProductsScreen.map((product) => product?.products)
    const active = localStorage.getItem("active")
    const navigate = useNavigate()
    console.log(myProductsScreen)

    function passwordConfigs(event: React.KeyboardEvent<HTMLDivElement>) {
        if(event.key === "Enter"){
            
            if(passworDigit.length){
                setPasswordDigit("")
                return setPassword(Number(passworDigit))
            }

            setPassword(password + 1)

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = `Senha ${password + 1}. Repetindo, senha ${password + 1}`;
                utterance.lang = 'pt-BR';
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.volume = 1;
                speechSynthesis.speak(utterance);
            }
        }

        if(!isNaN(Number(event.key))){
            setPasswordDigit(passworDigit+event.key)
            console.log(passworDigit)
        }

        if(event.key === "Escape"){
            setPasswordDigit("")
        }

    }
 
    useEffect(() => {
        if(active !== "true"){
            navigate("/user")
        }

        const screens = async () => {
            try {
                const sucess = await axios.get(`https://siempre-tecnologia-backend-5obk.onrender.com/screen/${screen_id}`, config)
                setScreen(sucess?.data)
            } catch (error) {
                console.log(error)
            }
        }
        screens()
        const getProducts = async () => {
            try {
                const productsList = await axios.get("https://siempre-tecnologia-backend-5obk.onrender.com/products", config)
                setMyProducts(productsList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
        const getProductsScreen = async() => {
            try{
                const sucess = await axios.get(`https://siempre-tecnologia-backend-5obk.onrender.com/productsscreen/${screen_id}`, config)
                setMyProductsScreen(sucess.data)
            }catch(error){
                console.log(error)
            }
        }
        getProductsScreen()
    }, [settings.update])

    return (
        <Container onKeyDown={(event) =>  passwordConfigs(event)} tabIndex={0}>
            <Settings 
                settings={settings} 
                setSettings={setSettings}
                screen={screen} setScreen={setScreen} 
                myProducts={myProducts} 
                ProductsId={ProductsId} 
                myProductsScreen={myProductsScreen} 
            />

            <SideBar password={password} screen={screen} />
            <ProductsTable screen={screen} Products={Products} />
            <img className="settings" src={iconSetting} onClick={() => setSettings({ ...settings, settingVisible: true })} />
            <div className="backPage" onClick={() =>navigate("/user")}>Voltar</div>
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
    
    .backPage{
        font-size: 1.6rem;
        font-weight: bold;
        position: fixed;
        right: 16px;
        top: 8px;
        opacity: 0;
        z-index: 10000;
     

        &:hover{
            opacity: 1;
        }
    }


 
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

`