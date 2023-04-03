import { useState } from "react"
import { filteredProducts } from "./functions"
import Container from "./styles"


export type ProductType2 = {
    id: number
    code: number,
    type: string,
    product: string,
    price: number,
    user_id: number
}

type MyProductsProps = {
    myProducts: ProductType2[],
    screen_id: number,
    ProductsId: Array<Number>,
    settings: {
        settingVisible: boolean,
        update: boolean
    }
    setSettings: React.Dispatch<React.SetStateAction<{
        settingVisible: boolean;
        update: boolean
    }>>
}

export default function MyProducts({ myProducts, screen_id, ProductsId, settings, setSettings }: MyProductsProps) {
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const [search, setSearch] = useState("")
    const filterProducts = myProducts.filter((product) => product?.product.includes(search.toLocaleUpperCase()))

    return (
        <Container>
            <h1>Meus Produtos</h1>
            <input type={"text"} onChange={(event) => setSearch(event.target.value)} value={search}></input>
            <p>Numero de Produtos: {filterProducts.length ? filterProducts.length : myProducts.length}</p>

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
                        {filteredProducts(filterProducts, screen_id, config, setSettings, settings, myProducts, ProductsId)}
                    </tbody>

                </table>
            </div>

        </Container>
    )
}

