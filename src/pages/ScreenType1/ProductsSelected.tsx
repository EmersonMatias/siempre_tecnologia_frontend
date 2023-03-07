import styled from "styled-components"
import { useState } from "react"
import { ProductScreen } from "../../types/types"

type ProductsSelectedProps = {
    myProductsScreen: ProductScreen[]
}


export default function ProductsSelected({myProductsScreen }:ProductsSelectedProps){
    const [search, setSearch] = useState("")
    const filterProducts =  myProductsScreen.filter((product) => product?.products.product.includes(search.toLocaleUpperCase()))
    
    return(
        <Container>
              <h1>Produtos Selecionados</h1>
              <input type={"text"} onChange={(event) => setSearch(event.target.value)} value={search}></input>
              <p>Numero de Produtos: {filterProducts.length ? filterProducts.length : myProductsScreen.length}</p>
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
                            {
                            filterProducts?.length ?
                            filterProducts?.map((product, index) => (
                                <tr key={index} >
                                    <td>{product.products.code}</td>
                                    <td>{product.products.product}</td>
                                    <td>{product.products.type}</td>
                                    <td>R$ {(Number(product.products.price) / 100).toFixed(2).replace(".", ",")}</td>
                                </tr>))  :
                                     myProductsScreen?.map((product, index) => (
                                        <tr key={index} >
                                            <td>{product.products.code}</td>
                                            <td>{product.products.product}</td>
                                            <td>{product.products.type}</td>
                                            <td>R$ {(Number(product.products.price) / 100).toFixed(2).replace(".", ",")}</td>
                                        </tr>))

                            }
                        </tbody>

                    </table>
                </div>
        </Container>
    )
}


const Container = styled.div`
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 5rem;
   
    
    p{
      margin-top: 0.8rem;
      margin-left: 0.8rem;
    }

    table{
        width: 100%;
        table-layout: fixed;
        word-wrap:break-word;
        text-align: center;
    }

    .myProductsContainer{
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        overflow-y: scroll;
        height: 400px;
    }

    .myProductsContainer::-webkit-scrollbar {
        width: 10px;     
    }

    .myProductsContainer::-webkit-scrollbar-thumb {
        background: #000000;
        border-radius: 8px;     
    }

`