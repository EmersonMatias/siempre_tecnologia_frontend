import { useEffect, useState } from "react"
import { ProductScreen } from "../../../../types/types"
import { useParams } from "react-router-dom"
import Container from "./styles"
import { filteredProducts, getPromotionalProducts, putPromotionalLine } from "./functions"

type ProductsSelectedProps = {
    monitorProducts: ProductScreen[]
}

export default function ProductsSelected({ monitorProducts }: ProductsSelectedProps) {
    const [search, setSearch] = useState("")
    const filterProducts = monitorProducts.filter((product) => product?.products.product.includes(search.toLocaleUpperCase()))
    const monitorId = useParams().id
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [promotionalProducts, setPromotionalProducts] = useState<any>([])
    const [updateSection, setUpdateSection] = useState(false)

    useEffect(() => {
        getPromotionalProducts(Number(monitorId), config, setPromotionalProducts)

    }, [updateSection])

    return (
        <Container>
            <h1>Produtos Selecionados</h1>
            <input type={"text"} onChange={(event) => setSearch(event.target.value)} value={search}></input>
            <p>Numero de Produtos: {filterProducts.length ? filterProducts.length : monitorProducts.length}</p>

            <div className="myProductsContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Produto</th>
                            <th>Und</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts(filterProducts, Number(monitorId), config, setUpdateSection, updateSection, promotionalProducts, monitorProducts)}
                    </tbody>
                </table>
            </div>

        </Container>
    )
}


