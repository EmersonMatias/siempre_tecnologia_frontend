import axios from "axios"
import { useEffect, useState } from "react"
import promo2 from "../../../img/promo.png"
import { useParams } from "react-router-dom"
import Container, { PropsProductsTable } from "./styles"
import { BASE_URL } from "../../../constants/constants"
import { getScreenLogo } from "../settings/screenLogo/functions"

export default function ProductsTable({ screen, Products }: PropsProductsTable) {
    const quantityLines = screen.table_lines
    const [init, setInit] = useState(0)
    const [end, setEnd] = useState(quantityLines)
    const products = Products?.slice(init, end)
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const screen_id = Number(useParams().id)
    const [promotionalProducts, setPromotionalProducts] = useState<any>([])
    const [logo, setLogo] = useState({ id: 0, url: "" })

    useEffect(() => {
        const interval = setInterval(() => {
            if (end >= Products.length - 1) return setInit(0), setEnd(quantityLines)
            setInit(init + quantityLines)
            setEnd(end + quantityLines)

        }, 3000)

        return () => clearInterval(interval);

    }, [init, quantityLines, screen.table_lines, Products])

    useEffect(() => {
        const getPromotionalProducts = async () => {

            try {
                const sucess = await axios.get(`${BASE_URL}/promotionalproducts/${screen_id}`, config)
                setPromotionalProducts(sucess.data.map((product: any) => product?.product_id))
            } catch (error) {
                console.log(error)
            }
        }

        getPromotionalProducts()
        getScreenLogo(screen_id, setLogo)
    }, [])

    type ProductType2 = {
        id: number
        code: number,
        type: string,
        product: string,
        price: number,
        user_id: number
    }

    return (
        <Container screen={screen} Products={Products}>

            <div className="gradient">
                <header><p className="products">Produtos</p><p className="prices">Preços</p></header>
                <div className="table">
                    <div className="products">
                        {products?.map((e, index) => (
                            <div className={promotionalProducts.includes(e.id) ? "product promotional" : "product"}>
                                <p>{e.product}{index}</p>
                                {promotionalProducts.includes(e.id) ? <img src={promo2} /> : null}
                                <p>R$ {(e.price / 100).toFixed(2).replace(".", ",")}</p>
                            </div>))
                        }
                    </div>
                </div>
            </div>

            <img className="imgLogo" src={logo.url}></img>
        </Container>
    )
}


