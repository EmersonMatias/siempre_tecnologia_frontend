import { useEffect, useState } from "react"
import ProductsTable from "./productsTable"
import Settings from "./settings/index.js"
import SideBar from "./sideBar/index.js"
import iconSetting from "../../img/iconSetting.svg"
import { useNavigate, useParams } from "react-router-dom"
import { ProductScreen, Screen } from "../../types/types"
import { ProductType2 } from "./settings/myProducts"
import { passwordConfigs } from "./sideBar/functions"
import iconLoading from "../../img/Loading.svg"
import { defaultMonitor, getMyMonitor, getProducts, getProductsFromMonitor } from "./function"
import Container from "./styles"


export default function ScreenType1() {
    const [password, setPassword] = useState(0)
    const [passworDigit, setPasswordDigit] = useState("")
    const [screen, setScreen] = useState<Screen>(defaultMonitor)
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [settings, setSettings] = useState({
        settingVisible: false,
        update: false
    })
    const monitorId = useParams().id
    const [myProducts, setMyProducts] = useState<ProductType2[]>([])
    const [monitorProducts, setMonitorProducts] = useState<ProductScreen[]>([])
    const ProductsId: Number[] = monitorProducts.map((product) => (product?.product_id))
    const Products = monitorProducts.map((product) => product?.products)
    const active = localStorage.getItem("active")
    const navigate = useNavigate()
    const isReady = monitorProducts.length !== 0 || screen.id !== 0

    console.log(screen, "aaaaaaaaaaaaaaaa")
    useEffect(() => {
        if (active !== "true") {
            navigate("/user")
        }

        getMyMonitor(Number(monitorId), config, setScreen)

        getProducts(config, setMyProducts)

        getProductsFromMonitor(Number(monitorId), config, setMonitorProducts)
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
                    monitorProducts={monitorProducts}
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
