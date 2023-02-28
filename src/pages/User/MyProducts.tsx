import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import MyContext from "../../context/context"
import { ProductType } from "./UserScreen"

type UserScreenProps = {
    updatePage: boolean,
    setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MyProducts({ updatePage, setUpdatePage }: UserScreenProps) {
    const { config } = useContext(MyContext)
    const list: any = localStorage.getItem("list")
    const [myProducts, setMyProducts] = useState<ProductType[]>([])
    const productsSelected: ProductType[] = JSON.parse(list)
    const productsCode = productsSelected?.map((e: ProductType) => (e.code))

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsList = await axios.get("http://localhost:4000/products", config)
                setMyProducts(productsList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [updatePage])

    function showPr(item: ProductType) {
        const products: ProductType[] = JSON.parse(list)
        console.log(products)

        if ((products?.find((product, index) => (product.code === item.code)))) {
            let indexProduct: number = -1;

            const a = products?.map((product, index) => (
                product.code === item.code ? indexProduct = index : ""
            ))

            console.log(products)
            localStorage.removeItem("list")
            products.splice(indexProduct, 1)
            console.log(products)
            localStorage.setItem("list", JSON.stringify(products))
            return setUpdatePage(!updatePage)
        }

        if (products === null) {
            localStorage.removeItem("list")
            const newProducts = [item]
            localStorage.setItem("list", JSON.stringify(newProducts))

        } else {

            localStorage.removeItem("list")
            const newProducts = [...products, item]
            localStorage.setItem("list", JSON.stringify(newProducts))
        }

        setUpdatePage(!updatePage)
    }

    return (
        <Container>

            <div className="containers">
                <h1>Meus Produtos</h1>
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
                            {myProducts.map((product, index) => (
                                <tr key={index} onClick={() => { showPr(product) }} className={productsCode?.includes(product.code) ? "back" : ""}>
                                    <td>{product.code}</td>
                                    <td>{product.product}</td>
                                    <td>{product.type}</td>
                                    <td>R$ {(Number(product.price) / 100).toFixed(2).replace(".", ",")}</td>
                                </tr>))}
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="containers">
                <h1>Produtos Selecionados</h1>
                <div className="productsSelected">
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
                            {productsSelected?.map((product, index) => (
                                <tr key={index} onClick={() => { showPr(product) }}>
                                    <td>{product.code}</td>
                                    <td>{product.product}</td>
                                    <td>{product.type}</td>
                                    <td>R$ {(Number(product.price) / 100).toFixed(2).replace(".", ",")}</td>
                                </tr>))}
                        </tbody>

                    </table>
                </div>
            </div>


        </Container>
    )
}

const Container = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;

    .containers{
        width: 40%;
        height: 800px;
    }

    .myProductsContainer, .productsSelected{
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        overflow-y: scroll;
    }

    h1{
        font-size: 2.4rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
    }
   
    .back{
        background-color: rgb(223,41,41, 0.6);
        color: rgb(255,255,255,1);
    }
    
    table{
        width: 100%;
        table-layout: fixed;
        word-wrap:break-word;
        text-align: center;
    }


    .myProductsContainer::-webkit-scrollbar {
        width: 10px;     
    }

    .myProductsContainer::-webkit-scrollbar-thumb {
        background: #000000;
        border-radius: 8px;     
    }

    .productsSelected::-webkit-scrollbar {
        width: 10px;     
    }

    .productsSelected::-webkit-scrollbar-thumb {
        background: #000000;
        border-radius: 8px;     
    }
`