import { useEffect, useState } from "react"
import styled from "styled-components"
import background from "../../img/background2.png"
import { ProductType } from "../User/UserScreen"
type PropsProductsTable = {
    screen:{
        background_url: string,
        font_family: string,
        font_size: number,
        id: number,
        screen_name: string,
        show_banner: boolean,
        show_counter: boolean,
        show_productstable: boolean,
        space_lines: number,
        table_lines: number,
        user_id: number,
        color_lines: string,
        width_table: number
    },
    Products: ProductType[]
}



export default function ProductsTable({ screen, Products}: PropsProductsTable) {
    const quantityLines = screen.table_lines
    const [init, setInit] = useState(0)
    const [end, setEnd] = useState(quantityLines)
    const list: any = localStorage.getItem("list")
    const products = Products?.slice(init, end)


    useEffect(() => {
        const interval = setInterval(() => {
            if (end >= Products.length - 1) return setInit(0), setEnd(quantityLines)
            setInit(init + quantityLines)
            setEnd(end + quantityLines)

        }, 3000)
        console.log(interval)
        return () => clearInterval(interval);


    }, [init, quantityLines])


    return (
        <Container screen={screen} Products={Products}>

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
        width: ${props => (props.screen.show_banner === false && props.screen.show_counter === false) ? 100 : props.screen.width_table}vw;
        height: 100%;
        display: ${props => props.screen.show_productstable === true ? "flex" : "none"};
        background-image: url(${props => props.screen.background_url});
        background-repeat: no-repeat;
        background-size: cover;
        padding: 0 3rem;
        position: relative;
        font-family: ${props => props.screen.font_family};

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
                font-size: ${props => props.screen.font_size}rem;

                .product{
                    display: flex;
                    justify-content: space-between;
                    padding-right: 1rem;
                    margin-bottom: ${props => props.screen.space_lines}rem;
                    z-index: 500;
                    background-color: ${props => props.screen.color_lines};
                }
            }
        }
     
`