import { useEffect, useState } from "react"
import styled from "styled-components"
import background from "../../img/background2.png"
import { ProductType } from "../User/UserScreen"
type PropsProductsTable = {
    settings: {
        showCounter: boolean,
        showProductsTable: boolean,
        showBanner: boolean,
        settingVisible: boolean,
        tableLines: number,
        spaceLines: number,
        fontSize: number
    }
}



export default function ProductsTable({ settings }: PropsProductsTable) {
    const quantityLines = settings.tableLines
    const [init, setInit] = useState(0)
    const [end, setEnd] = useState(quantityLines)
    const list: any = localStorage.getItem("list")
    const product:ProductType[] = JSON.parse(list)
    console.log(product)
    const products = product?.slice(init, end)

    useEffect(() => {
        const interval = setInterval(() => {
            if (end >= product.length - 1) return setInit(0), setEnd(quantityLines)
            setInit(init + quantityLines)
            setEnd(end + quantityLines)

        }, 3000)
        console.log(interval)
        return () => clearInterval(interval);


    }, [init, quantityLines])


    return (
        <Container settings={settings}>

            <div className="gradient">
                <header><p>Produtos</p><p>Preços</p></header>
                <div className="table">
                    <div className="products">
                        {products?.map((e, index) => (<div className="product"><p>{e.product}{index}</p><p>R$ {(e.price/100).toFixed(2).replace(".", ",")}</p></div>))}
                    </div>
                </div>
            </div>
        </Container>
    )
}


const Container = styled.div<PropsProductsTable>`
        width: 320%;
        height: 100%;
        display: ${props => props.settings.showProductsTable === true ? "flex" : "none"};
        background-image: url(${background});
        background-repeat: no-repeat;
        background-size: cover;
        padding: 0 3rem;
        position: relative;

        .table{
            display: flex;
            justify-content: space-between;
            margin-top: 2vh;
            width: 100%;
            height: 85%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 1.6rem;

            .products{
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow-wrap: break-word;
                font-size: ${props => props.settings.fontSize}rem;

                .product{
                    display: flex;
                    justify-content: space-between;
                    padding-right: 1rem;
                    margin-bottom: ${props => props.settings.spaceLines}rem;
                    z-index: 500;
                    background-color: #0026ff;
                }
            }
        }
     
`