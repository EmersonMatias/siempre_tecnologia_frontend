import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ProductsTable from "./ProductsTable"
import Settings from "./Settings"
import SideBar from "./SideBar"
import iconSetting from "../../img/iconSetting.svg"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { ProductScreen, Screen } from "../../types/types"
import { ProductType2 } from "../User/MyProducts"
import { passwordConfigs } from "./functionsSideBar"
import iconLoading from "../../img/Loading.svg"
import { defaultScreen, getProducts, getProductsScreen, getScreen } from "./functionsScreen"


export default function ScreenType1() {
    const [password, setPassword] = useState(0)
    const [passworDigit, setPasswordDigit] = useState("")
    const [screen, setScreen] = useState<Screen>(defaultScreen)
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
    const isReady = myProductsScreen.length !== 0 || screen.id !== 0


    useEffect(() => {
        if (active !== "true") {
            navigate("/user")
        }

        getScreen(screen_id, config, setScreen)
       
        getProducts(config, setMyProducts)
     
        getProductsScreen(screen_id, config, setMyProductsScreen)
    }, [settings.update])

    return (
        <Container onKeyDown={(event) => passwordConfigs(event, password, setPassword, passworDigit, setPasswordDigit)} tabIndex={0} isReady={isReady}>

            <div className="contentContainer">
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
                <div className="backPage" onClick={() => navigate("/user")}>Voltar</div>
            </div>

            <div className="loadingScreen">
                <img src={iconLoading} />
            </div>

        </Container>
    )
}

type ScreenProps = {
    isReady: boolean
}

const Container = styled.div<ScreenProps>`
    max-width: 100%;
    height: 100vh;
    display: flex;
    color: white;
    overflow: hidden;

    .loadingScreen{
        width: 100%;
        height: 100%;
        display: ${props => props.isReady === true ? "none" : "flex"};
        justify-content: center;

        img{
          height: 100%;
        }
    }
  
    .contentContainer{
        width: 100%;
        height: 100;
        background-color: #0026ff;
        display: ${props => props.isReady === true ? "flex" : "none"};
        color: white;
        position: relative;
    }
    
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