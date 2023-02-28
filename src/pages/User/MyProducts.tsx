import axios from "axios"
import styled from "styled-components"
import { ProductType } from "./UserScreen"


export type ProductType2 = {
    id: number
    code: number,
    type: string,
    product: string,
    price: number,
    user_id: number
}

type a = {
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

export default function MyProducts({ myProducts, screen_id , ProductsId, settings, setSettings}: a) {
    const token = localStorage.getItem("token")
    const config = { headers: { Authorization: `Bearer ${token}` } }
    

    function selectProduct(product: ProductType){
     
        const sendProduct = async () => {
            try{
               const sucess = await axios.post(`http://localhost:4000/productsscreen/${screen_id}`, product, config)
                console.log(sucess)
                setSettings({...settings, update: !settings.update})
            }catch(error){
                console.log(error)
            }
        }

        sendProduct()
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
                            {myProducts?.map((product, index) => (
                                <tr key={index} onClick={() => selectProduct(product)} className={`${ProductsId?.includes(product.id) ? "back" : ""}`}>
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
    padding: 2.4rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;


    .containers{
        width: 100%;
        height: 500px;
    }

    .myProductsContainer{
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
`