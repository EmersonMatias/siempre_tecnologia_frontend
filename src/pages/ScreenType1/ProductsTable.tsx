import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Screen } from "../../types/types"
import { ProductType } from "../User/UserScreen"
import promo2 from "../../img/promo.png"
import { useParams } from "react-router-dom"
import { ProductType2 } from "../User/MyProducts"

type PropsProductsTable = {
    screen: Screen,
    Products: ProductType2[]
}

export default function ProductsTable({ screen, Products}: PropsProductsTable) {
    const quantityLines = screen.table_lines
    const [init, setInit] = useState(0)
    const [end, setEnd] = useState(quantityLines)
    const products = Products?.slice(init, end) 
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const screen_id = useParams().id
    const [promotionalProducts, setPromotionalProducts] = useState<any>([])

    useEffect(() => {
        const interval = setInterval(() => {
            if (end >= Products.length - 1) return setInit(0), setEnd(quantityLines)
            setInit(init + quantityLines)
            setEnd(end + quantityLines)

        }, 3000)

        return () => clearInterval(interval);

    }, [init, quantityLines, screen.table_lines, Products])

    useEffect(() => {
        const getPromotionalProducts =  async() => {

            try{
                const sucess = await axios.get(`https://siempre-tecnologia-backend-5obk.onrender.com/promotionalproducts/${screen_id}`, config)
                setPromotionalProducts(sucess.data.map((product: any) => product?.product_id ))
            }catch(error){
                console.log(error)
            }
        }

        getPromotionalProducts()
    }, [])

   type ProductType2 = {
        id: number
        code: number,
        type: string,
        product: string,
        price: number,
        user_id: number
    }

    async function promotionalLine(event:React.MouseEvent<HTMLDivElement, MouseEvent>, e: ProductType2){
        try{
            const sucess = await axios.post("https://siempre-tecnologia-backend-5obk.onrender.com/promotionalproducts",{product_id: e?.id ,screen_id}, config)
            console.log(sucess)
        }catch(error){
            console.log(error)
        }

    }
 
    return (
        <Container screen={screen} Products={Products}>

            <div className="gradient">
                <header><p className="products">Produtos</p><p className="prices">Preços</p></header>
                <div className="table">
                    <div className="products">
                        { products?.map((e, index) => (
                            <div className="product" onClick={(event) => promotionalLine(event, e)}>
                                {promotionalProducts.includes(e.id) ? <div className="promotional" ><img src={promo2}/></div> : ""}
                                <p>{e.product}{index}</p>
                                <p>R$ {(e.price/100).toFixed(2).replace(".", ",")}</p>
                            </div>))
                        }
                    </div>
                </div>
            </div>

            <img className="imgLogo" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"></img>
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
    
        .imgLogo{
            height: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;
        }

        header{
            display: flex;
            justify-content: space-between;
            margin-top: 1.6rem;
            font-family: ${props => props.screen.font_family_title};
            font-size: 5vw;
            z-index: 520;
            color: ${props => props.screen.color_title};

            .products{
                display: flex;
                background-color: ${props => props.screen.background_color_title};
                width: 70%;
                justify-content: ${props => props.screen.product_position};
            }

            .prices{
                display: flex;
                background-color: ${props => props.screen.background_color_title};
                width: 30%;
                justify-content:  ${props => props.screen.price_position};
            }
        }

        .gradient{
            z-index: 200;
        }
        .table{
            display: flex;
            justify-content: space-between;
            margin-top: 2vh;
            width: 100%;
            height: 85%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 1.6rem;
            color: ${props => props.screen.color};

            .products{
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow-wrap: break-word;
                font-size: ${props => props.screen.font_size}rem;

                .product{
                    display: flex;
                    position: relative;
                    justify-content: space-between;
                    padding-right: 1rem;
                    margin-bottom: ${props => props.screen.space_lines}rem;
                    z-index: 500;
                    background-color: ${props => props.screen.color_lines};
                }
            }
        }

        .promotion{
            color: blue;
        }

        .promotional{
            display: flex;
            position: absolute;
            right: 200px;
            top: -55px;
      

            img{
                height: 140px;
            }
        }
     
`