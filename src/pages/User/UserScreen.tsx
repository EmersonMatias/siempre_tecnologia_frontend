import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyContext from "../../context/context"
import BlockPage from "../Block/BlockPage"
import { exitAccount, getProducts } from "./functionsUser"
import { ProductType2 } from "./MyProducts"
import Screens from "./Screens"

export type ProductType = {
    code: number,
    type: string,
    product: string,
    price: number,
    user_id: number
}

export default function UserScreen() {
    const { userData, setUserData, config } = useContext(MyContext)
    const [updatePage, setUpdatePage] = useState<boolean>(false)
    const navigate = useNavigate()
    const active = localStorage.getItem("active")
    const [myProducts, setMyProducts] = useState<ProductType2[]>([])

    useEffect(() => {
        if (userData?.account_type === "admin") return navigate("/")
        if (userData.token === "") return navigate("/")

        getProducts(setMyProducts)
    }, [updatePage])



    return (
        <Container >
            {active === "true" ? null : <BlockPage />}

            <header>
                <h1>Tabela de Configurações</h1>
                <div className="exit" onClick={() => exitAccount(setUserData, setUpdatePage, updatePage)}>
                    Sair
                </div>
            </header>

            <div className="configContainer">
                <Screens updatePage={updatePage} setUpdatePage={setUpdatePage} />
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2rem;
    overflow-wrap: break-word;
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;

    .exit{
        position: absolute;
        right: 40px;
        font-size: 1.6rem;
        font-weight: bold;
        color: rgb(0,0,0,0.5);
        z-index: 100000;

        &:hover{
            color: red;
        }
    }


    header{
        position: relative;
        width: 100%;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 600;
    }

    .configContainer{
        width: 100%;
        display: flex;
    }

`